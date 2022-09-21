const company = {
  4005927002: 94951, //  National Center for Hebrew Language,
  4005925002: 94952, //  Hebrew Language Academy Charter School,
  4005926002: 94953, //  Hebrew Language Academy Charter School 2,
  4005924002: 94954, //  Harlem Hebrew Language Academy,
  4023797002: 94955, // Staten Island Hebrew Public Charter Scho,
  4005928002: 94956, // Philadelphia Hebrew Public
};

const employeeType = {
  "Full-time": "RFT",
  "Part-time": "RPT",
  Intern: "TFT",
  Contract: "SNL",
  Temporary: "TPT",
};

const taxFields = {
  taxSetup: {
    suiState: "NY",
    taxForm: "W2",
  },
  primaryStateTax: {
    amount: 0.0,
    exemptions: 0.0,
    exemptions2: 0.0,
    filingStatus: "S",
    percentage: 0.0,
    specialCheckCalc: "Supp",
    taxCalculationCode: "D",
    taxCode: "NY",
    w4FormYear: 2019,
  },
  federalTax: {
    amount: 0.0,
    filingStatus: "S",
    percentage: 0.0,
    taxCalculationCode: "D",
    w4FormYear: 2020,
    otherIncomeAmount: 8600.0,
  },
  localTax: [
    {
      exemptions: 0.0,
      exemptions2: 0.0,
      filingStatus: "N/A",
      taxCode: "NY-MTA1",
    },
  ],
};

const GreenHouseToPaylocity = (greenhouseData) => {
  const { candidate, jobs, offer } = greenhouseData;
  if (!candidate || !jobs) return;

  const homeAddress = candidate.addresses.find((a) => a.type === "home");
  const workAddress = candidate.addresses.find((a) => a.type === "work");

  const paylocityData = {
    ...taxFields,
    firstName: candidate.first_name,
    lastName: candidate.last_name,
    gender: candidate.candidate_gender_pronouns.pronouns,
    currency: "USD",
    homeAddress: {
      address1: homeAddress?.value,
      emailAddress: candidate.email_addresses.find((_) => _.type === "personal")?.value,
      mobilePhone: candidate.phone_numbers.find((_) => _.type === "personal")?.value,
      phone: candidate.phone_numbers.find((_) => _.type === "home")?.value,
    },
    taxSetup: {
      suiState: "NY",
      taxForm: "W2",
    },
    primaryPayRate: {
      annualSalary: Number(offer.custom_fields["salary_offer_1544809907.2708142"].value.amount),
      baseRate: Number(offer.custom_fields.current_salary.value),
      beginCheckDate: offer.starts_at,
      changeReason: null,
      defaultHours: Number(offer.custom_fields.hourly_wage.value.amount),
      effectiveDate: offer.starts_at,
      isAutoPay: false,
      payFrequency: "M",
      payGrade: null,
      payRateNote: null,
      payType: null,
      ratePer: null,
      salary: Number(offer.custom_fields["salary_offer_1544809907.2708142"].value.amount),
    },
    departmentPosition: {
      costCenter1: "Temporary",
      effectiveDate: jobs[0].opened_at,
      employeeType: employeeType[jobs[0].custom_fields.employment_type.value],
      jobTitle: offer.custom_fields.position_title.value,
    },
    emergencyContacts: [
      {
        address1: homeAddress?.value,
        email: candidate.email_addresses.find((_) => _.type === "personal")?.value,
        firstName: candidate.first_name,
        homePhone: candidate.phone_numbers.find((_) => _.type === "home")?.value,
        lastName: candidate.last_name,
        mobilePhone: candidate.phone_numbers.find((_) => _.type === "personal")?.value,
        workPhone: candidate.phone_numbers.find((_) => _.type === "work")?.value,
        primaryPhone: "M",
        priority: "P",
        relationship: "Friend",
      },
    ],
    status: {
      changeReason: "New Hire",
      effectiveDate: offer.starts_at,
      hireDate: offer.resolved_at,
      employeeStatus: "A",
      isEligibleForRehire: true,
    },
    workAddress: {
      address1: workAddress?.value,
      emailAddress: candidate.email_addresses.find((_) => _.type === "work")?.value,
      mobilePhone: candidate.phone_numbers.find((_) => _.type === "work")?.value,
      phone: candidate.phone_numbers.find((_) => _.type === "work")?.value,
    },
  };

  return paylocityData;
};

module.exports = {
  company,
  GreenHouseToPaylocity,
};
