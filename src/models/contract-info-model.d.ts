export type loadInfoClient = {
    valCusName?: string,
    dateOfBirth?: string,
    telephoneNumber?: string,
    typeofDocument?: string,
    numberID?: string,
    dateRange?: string,
    issuedBy?: string,
    numberIdOld?: string,
    email?: string,
    customerResources?: string
}

export type LoadHouseholdAddress = {
    city?: string,
    district?: string,
    ward?: string,
    nest?: string
}

export type LoadAddressIn = {
    residencyForm?: string,
    city?: string,
    district?: string,
    ward?: string,
    nest?: string,
    timeLive?: string
}

export type LoadJob = {
    companyName?: string;
    companyAddress?: string;
    companyPhoneNumber?: string;
    position?: string;
    job?: string;
    timeWorkCompany?: string;
    income?: string;
    formTakeSalary?: string
}

export type LoadInforRelative = {
    referencePerson?: string;
    relationship?: string;
    relativePhone?: string;
    residentialAddress?: string;
    feedback?: string;
}
export type RelativePersonArray = {
    personOne?: LoadInforRelative,
    personTwo?: LoadInforRelative,
    personThree?: LoadInforRelative,
}


