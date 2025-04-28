interface ApplicantHeader {
  applicantNumber: string;
  city: string;
  email: string;
}

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
  'San Francisco',
  'Charlotte',
  'Indianapolis',
  'Seattle',
  'Denver',
  'Boston'
];

const domains = [
    'agile.io',
    'pivot.io',
    'grind.io',
    'flow.io',
    'value.io',
    'task.io',
    'work.io',
    'output.io',
    'labor.io',
    'adapt.io'
  ];
  

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateApplicantHeader = (): ApplicantHeader => {
  const number = generateRandomNumber(1000, 9999);
  const applicantNumber = `Applicant #${number}`;
  const city = cities[Math.floor(Math.random() * cities.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `applicant.${number}@${domain}`;

  return {
    applicantNumber,
    city,
    email
  };
}; 