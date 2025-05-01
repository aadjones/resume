'use client'
import { useEffect, useRef, useState } from 'react'
import { useWizard } from '../context/WizardContext'
import { usePathname } from 'next/navigation'

export default function ResumePreview() {
  const { content, identity } = useWizard()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const pathname = usePathname()

  // Function to adjust scale
  const adjustScale = () => {
    if (!containerRef.current || !contentRef.current) return

    const containerHeight = containerRef.current.clientHeight
    const contentHeight = contentRef.current.scrollHeight
    
    // Start with scale 1
    let newScale = 1
    
    // If content is taller than container, reduce scale
    if (contentHeight > containerHeight) {
      newScale = containerHeight / contentHeight
      
      // Don't let it get too small - minimum 70% of original size
      newScale = Math.max(newScale, 0.7)
    }

    setScale(newScale)
  }

  // Adjust scale on content change and handle resize
  useEffect(() => {
    // Initial scale adjustment
    adjustScale()

    // Set up resize observer if in browser
    let observer: ResizeObserver | null = null
    
    const setupResizeObserver = async () => {
      if (typeof window !== 'undefined' && containerRef.current) {
        observer = new ResizeObserver(adjustScale)
        observer.observe(containerRef.current)
      }
    }

    setupResizeObserver()

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [content])

  // Determine which sections to show based on the current path
  const showExperience = !pathname?.includes('/wizard/profile')
  const showSkills = !pathname?.includes('/wizard/profile') && !pathname?.includes('/wizard/experience')

  return (
    <div 
      ref={containerRef}
      className="h-screen w-1/2 fixed top-0 right-0 bg-white dark:bg-gray-900 border-l overflow-hidden"
    >
      <div 
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-out'
        }}
        className="p-8"
      >
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {identity.name || <span className="text-gray-400">Your Name</span>}
          </h1>
          <div className="text-gray-600">
            {identity.city || <span className="text-gray-400">City, ST</span>} • {identity.email || <span className="text-gray-400">you@example.com</span>}
          </div>
        </div>

        {/* OBJECTIVE */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold border-b mb-4">Objective</h2>
          <p className={!content.objective ? "text-gray-400" : ""}>
            {content.objective || "Your career objective statement will appear here"}
          </p>
        </div>

        {/* EXPERIENCE */}
        {showExperience && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold border-b mb-4">Experience</h2>
            {content.experience.length > 0 ? (
              content.experience.map((job, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {job.company || <span className="text-gray-400">Company Name for Job #{index + 1}</span>}
                      </h3>
                      <div className="text-gray-600 italic">
                        {job.title || <span className="text-gray-400">Your Title</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div>{job.location || <span className="text-gray-400">Location</span>}</div>
                      <div className="text-gray-600">{job.dateRange || <span className="text-gray-400">Date Range</span>}</div>
                    </div>
                  </div>
                  {job.responsibilities.length > 0 ? (
                    <ul className="list-disc ml-4">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="mb-1">
                          {resp || <span className="text-gray-400">Enter responsibility #{i + 1} for Job #{index + 1}</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 ml-4">Add responsibilities for Job #{index + 1}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">Your work experience entries will appear here</p>
            )}
          </div>
        )}

        {/* SKILLS */}
        {showSkills && (
          <div>
            <h2 className="text-2xl font-bold border-b mb-4">Skills</h2>
            {content.skills.length > 0 && content.skills[0] !== '' ? (
              <ul className="list-disc ml-4">
                {content.skills.map((skill, index) => (
                  <li key={index} className="mb-1">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Your skills will appear here</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 