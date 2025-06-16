// src/app/api/pdf/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const { url, html } = await req.json();
    if (!url && !html) {
      return new NextResponse(
        "Must provide either `url` or `html` in the body",
        { status: 400 },
      );
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 1) Set a letter-width viewport so any @media print rules kick in correctly
    await page.setViewport({
      width: 8.5 * 96, // 816px
      height: 11 * 96, // 1056px (initial layout only)
      deviceScaleFactor: 2,
    });

    // 2) Load your content
    if (url) {
      await page.goto(url, { waitUntil: "networkidle0" });
    } else {
      await page.setContent(html!, { waitUntil: "networkidle0" });
    }

    // 3) Wait for the resume node
    await page.waitForSelector("#resume-preview-content");

    // 4) Measure its full scrollable size
    const { contentW, contentH } = await page.evaluate(() => {
      const el = document.getElementById("resume-preview-content")!;
      return {
        contentW: el.scrollWidth,
        contentH: el.scrollHeight,
      };
    });

    // 5) Define max page size in px (Letter at 96dpi)
    const maxPxW = 8.5 * 96; // 816
    const maxPxH = 11 * 96; // 1056

    // 6) Compute uniform scale so nothing ever overflows
    const scale = Math.min(1, maxPxW / contentW, maxPxH / contentH);

    // 7) Set the page size to exactly Letter size
    await page.setViewport({
      width: maxPxW,
      height: maxPxH,
      deviceScaleFactor: 2,
    });

    // 8) Apply scaling to the content
    await page.evaluate((s) => {
      const el = document.getElementById("resume-preview-content")!;
      el.style.transformOrigin = "top left";
      el.style.transform = `scale(${s})`;
    }, scale);

    // 9) Generate PDF with exact Letter dimensions
    const pdfBuffer = await page.pdf({
      printBackground: true,
      width: "8.5in",
      height: "11in",
      margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
    });

    await browser.close();

    // 10) Return it
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=survival_resume.pdf",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}
