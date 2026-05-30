export const runBRE = (
    dob: Date,
    salary: number,
    employmentMode: string,
    pan: string
) => {

    const today = new Date();
    const dobDate = new Date(dob);

    // FIX: account for whether birthday has passed yet this year
    let age = today.getFullYear() - dobDate.getFullYear();
    const hasBirthdayPassed =
        today.getMonth() > dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() && today.getDate() >= dobDate.getDate());
    if (!hasBirthdayPassed) age--;

    if (age < 23 || age > 50) {
        return {
            success: false,
            message: "Age must be between 23 and 50"
        };
    }

    if (salary < 25000) {
        return {
            success: false,
            message: "Salary below 25000"
        };
    }

    const panRegex =
        /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!panRegex.test(pan)) {
        return {
            success: false,
            message: "Invalid PAN"
        };
    }

    if (employmentMode === "UNEMPLOYED") {
        return {
            success: false,
            message: "Unemployed applicant"
        };
    }

    return {
        success: true
    };
};
