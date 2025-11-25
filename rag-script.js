// Comprehensive mock search results data
const sampleResults = {
    "sales tax nexus": [
        {
            jurisdiction: "state",
            state: "NY",
            docType: "statute",
            taxType: "sales_use",
            title: "NY Tax Law § 1101 - Definitions and Nexus Requirements",
            text: "For the purposes of this article, a person making sales of tangible personal property or services taxable under this article is required to register and collect tax if such person has sufficient nexus with this state. Sufficient nexus exists when a person: (a) maintains a place of business in this state, (b) has employees or representatives in this state, (c) has property in this state, or (d) makes sales into this state exceeding $500,000 in the preceding four quarters...",
            score: 0.94,
            sourceUrl: "https://www.nysenate.gov/legislation/laws/TAX",
            citation: "NY Tax Law § 1101",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "CA",
            docType: "regulation",
            taxType: "sales_use",
            title: "California Sales and Use Tax - Nexus Provisions",
            text: "A retailer is engaged in business in this state and is required to register for sales and use tax purposes if the retailer has substantial nexus with this state. Substantial nexus exists if the retailer: (1) has a physical presence in this state, (2) has employees, agents, or independent contractors in this state, (3) has property in this state, or (4) has sales into this state exceeding $500,000 in the preceding 12 months...",
            score: 0.91,
            sourceUrl: "https://www.cdtfa.ca.gov/",
            citation: "CA Rev & Tax Code § 6203",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "sales_use",
            title: "IRS Publication 598 - Tax on Unrelated Business Income",
            text: "While sales tax is primarily a state and local tax matter, businesses operating in multiple states must understand nexus requirements. Nexus determines whether a business has sufficient connection to a state to be required to collect and remit sales tax. This includes physical presence, economic nexus thresholds, and marketplace facilitator rules...",
            score: 0.87,
            sourceUrl: "https://www.irs.gov/publications/p598",
            citation: "IRS Pub 598",
            year: "2024"
        }
    ],
    "form 1040": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "form",
            taxType: "income",
            title: "Form 1040 - U.S. Individual Income Tax Return",
            text: "Form 1040 is used by U.S. taxpayers to file an annual income tax return. The form collects information about the taxpayer's income, deductions, credits, and tax liability. All individuals, estates, and trusts with income above certain thresholds must file Form 1040. The form includes schedules for various types of income and deductions...",
            score: 0.96,
            sourceUrl: "https://www.irs.gov/forms-pubs/about-form-1040",
            citation: "Form 1040",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 17 - Your Federal Income Tax",
            text: "Publication 17 provides comprehensive guidance on filing Form 1040. It explains who must file, what income to report, which deductions and credits are available, and how to calculate your tax. The publication includes detailed instructions for each line of Form 1040 and its related schedules...",
            score: 0.93,
            sourceUrl: "https://www.irs.gov/publications/p17",
            citation: "IRS Pub 17",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 1 - Tax Imposed",
            text: "There is hereby imposed on the taxable income of every individual a tax determined in accordance with the following tables. For taxable years beginning in 2024, the tax brackets are: 10% for income up to $11,000, 12% for income over $11,000, 22% for income over $44,725, and so forth. The tax imposed by subsection (a) shall be equal to the sum of the amounts determined under the applicable rate schedules...",
            score: 0.89,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 1",
            year: "2024"
        }
    ],
    "new york tax deductions": [
        {
            jurisdiction: "state",
            state: "NY",
            docType: "statute",
            taxType: "income",
            title: "NY Tax Law § 615 - Itemized Deductions",
            text: "For New York State income tax purposes, taxpayers may claim itemized deductions including: medical expenses exceeding 7.5% of federal adjusted gross income, state and local taxes (subject to federal limitations), charitable contributions, mortgage interest, and certain other expenses. New York follows federal rules for most deductions but has specific limitations...",
            score: 0.92,
            sourceUrl: "https://www.nysenate.gov/legislation/laws/TAX",
            citation: "NY Tax Law § 615",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 63 - Taxable Income Defined",
            text: "For purposes of this subtitle, the term 'taxable income' means gross income minus the deductions allowed by this chapter. Itemized deductions include medical expenses, taxes, interest, charitable contributions, and miscellaneous deductions. The standard deduction is also available as an alternative to itemizing...",
            score: 0.88,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 63",
            year: "2024"
        }
    ],
    "california sales tax exemptions": [
        {
            jurisdiction: "state",
            state: "CA",
            docType: "regulation",
            taxType: "sales_use",
            title: "California Sales and Use Tax - Exemptions",
            text: "The following transactions are exempt from sales and use tax: (1) sales of prescription medicines and medical devices, (2) sales of food products for human consumption (excluding prepared food), (3) sales to the United States government, (4) sales of certain manufacturing equipment, (5) sales of items for resale, and (6) sales of certain agricultural products. Each exemption has specific requirements and documentation that must be maintained...",
            score: 0.95,
            sourceUrl: "https://www.cdtfa.ca.gov/",
            citation: "CA Rev & Tax Code § 6351",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "CA",
            docType: "bulletin",
            taxType: "sales_use",
            title: "CDTFA Bulletin - Sales Tax Exemptions Guide",
            text: "This bulletin provides detailed guidance on sales and use tax exemptions available in California. It covers exemptions for manufacturing equipment, research and development activities, nonprofit organizations, and various industry-specific exemptions. Taxpayers must maintain proper documentation and certificates to claim exemptions...",
            score: 0.91,
            sourceUrl: "https://www.cdtfa.ca.gov/lawguides/vol1/sutl/sales-and-use-tax-law-guide.html",
            citation: "CDTFA Bulletin 2024-01",
            year: "2024"
        }
    ],
    "irs publication 17": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 17 - Your Federal Income Tax (2024)",
            text: "Publication 17 is the IRS's comprehensive guide to filing your federal income tax return. It covers who must file, filing status, dependents, income, adjustments to income, standard deduction, itemized deductions, tax credits, and how to figure your tax. The publication includes examples, worksheets, and references to specific forms and schedules...",
            score: 0.97,
            sourceUrl: "https://www.irs.gov/publications/p17",
            citation: "IRS Pub 17",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "form",
            taxType: "income",
            title: "Form 1040 Instructions - Line by Line Guide",
            text: "The Form 1040 instructions provide detailed guidance for each line of the tax return. It explains what information to enter, where to find supporting documents, and how to calculate various amounts. The instructions reference Publication 17 for more detailed explanations of tax concepts...",
            score: 0.94,
            sourceUrl: "https://www.irs.gov/forms-pubs/about-form-1040",
            citation: "Form 1040 Instructions",
            year: "2024"
        }
    ],
    "new jersey income tax": [
        {
            jurisdiction: "state",
            state: "NJ",
            docType: "statute",
            taxType: "income",
            title: "New Jersey Gross Income Tax Act",
            text: "New Jersey imposes a gross income tax on the income of residents and nonresidents. The tax rates range from 1.4% to 10.75% depending on income level. Residents are taxed on all income regardless of source, while nonresidents are taxed only on New Jersey source income. The act defines gross income, allowable deductions, and credits...",
            score: 0.93,
            sourceUrl: "https://www.state.nj.us/treasury/taxation/",
            citation: "NJ Rev Stat § 54A:1-1",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "NJ",
            docType: "bulletin",
            taxType: "income",
            title: "NJ Division of Taxation - Income Tax Technical Bulletin",
            text: "This technical bulletin provides guidance on New Jersey gross income tax provisions, including residency rules, sourcing of income, deductions, and credits. It addresses common questions about filing requirements, estimated tax payments, and tax credits available to New Jersey taxpayers...",
            score: 0.90,
            sourceUrl: "https://www.state.nj.us/treasury/taxation/tech.shtml",
            citation: "NJ Tax Bulletin TB-2024-01",
            year: "2024"
        }
    ],
    "connecticut sales tax": [
        {
            jurisdiction: "state",
            state: "CT",
            docType: "statute",
            taxType: "sales_use",
            title: "Connecticut Sales and Use Tax Act",
            text: "Connecticut imposes a 6.35% sales and use tax on the retail sale, rental, or lease of most goods and certain services. The tax applies to sales of tangible personal property, digital products, and specified services. Certain items are exempt, including prescription drugs, most food products, and clothing under $50. Businesses must register and collect tax if they have nexus with Connecticut...",
            score: 0.94,
            sourceUrl: "https://portal.ct.gov/DRS",
            citation: "CT Gen Stat § 12-407",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "CT",
            docType: "publication",
            taxType: "sales_use",
            title: "CT DRS Publication - Sales and Use Tax Guide",
            text: "This publication provides comprehensive information about Connecticut's sales and use tax, including what is taxable, exemptions, registration requirements, filing procedures, and recordkeeping requirements. It includes examples and answers to frequently asked questions...",
            score: 0.91,
            sourceUrl: "https://portal.ct.gov/DRS/Publications/Publications",
            citation: "CT DRS Pub 2024-01",
            year: "2024"
        }
    ],
    "massachusetts tax credits": [
        {
            jurisdiction: "state",
            state: "MA",
            docType: "statute",
            taxType: "income",
            title: "Massachusetts Income Tax Credits",
            text: "Massachusetts offers various tax credits to reduce income tax liability, including: the Earned Income Tax Credit, the Circuit Breaker Credit for senior citizens, the Dependent Care Credit, the Low Income Housing Credit, and various business credits. Each credit has specific eligibility requirements and limitations...",
            score: 0.92,
            sourceUrl: "https://www.mass.gov/info-details/income-tax-credits",
            citation: "MA Gen Laws Ch 62 § 6",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "MA",
            docType: "bulletin",
            taxType: "income",
            title: "MA DOR Technical Information Release - Tax Credits",
            text: "This TIR provides detailed information about available Massachusetts income tax credits, including eligibility requirements, calculation methods, carryforward provisions, and documentation requirements. It addresses recent changes to credit programs and provides examples...",
            score: 0.89,
            sourceUrl: "https://www.mass.gov/info-details/technical-information-releases",
            citation: "MA TIR 2024-01",
            year: "2024"
        }
    ],
    "pennsylvania tax forms": [
        {
            jurisdiction: "state",
            state: "PA",
            docType: "form",
            taxType: "income",
            title: "PA-40 - Pennsylvania Personal Income Tax Return",
            text: "Form PA-40 is used by Pennsylvania residents and nonresidents to file their personal income tax return. The form collects information about income, deductions, and credits. Pennsylvania has a flat 3.07% income tax rate. The form includes schedules for various types of income and deductions...",
            score: 0.95,
            sourceUrl: "https://www.revenue.pa.gov/FormsandPublications/Pages/default.aspx",
            citation: "Form PA-40",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "PA",
            docType: "bulletin",
            taxType: "income",
            title: "PA Department of Revenue - Tax Bulletin",
            text: "This bulletin provides guidance on filing Pennsylvania personal income tax returns, including who must file, filing deadlines, payment options, and available deductions and credits. It addresses common questions and provides examples...",
            score: 0.92,
            sourceUrl: "https://www.revenue.pa.gov/FormsandPublications/Pages/Tax-Bulletins.aspx",
            citation: "PA Tax Bulletin 2024-01",
            year: "2024"
        }
    ],
    "estate tax": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "estate",
            title: "IRC Section 26 USC § 2001 - Estate Tax Imposed",
            text: "A tax is hereby imposed on the transfer of the taxable estate of every decedent who is a citizen or resident of the United States. The tax is computed using a unified rate schedule and is reduced by the applicable credit amount. For 2024, the estate tax exemption is $13,610,000 per person. The tax applies to estates exceeding this threshold...",
            score: 0.96,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 2001",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "estate",
            title: "IRS Publication 559 - Survivors, Executors, and Administrators",
            text: "Publication 559 provides guidance on federal estate and gift tax requirements for executors, administrators, and survivors. It explains when Form 706 (Estate Tax Return) must be filed, how to value assets, what deductions are available, and how to calculate the estate tax...",
            score: 0.93,
            sourceUrl: "https://www.irs.gov/publications/p559",
            citation: "IRS Pub 559",
            year: "2024"
        },
        {
            jurisdiction: "state",
            state: "NY",
            docType: "statute",
            taxType: "estate",
            title: "NY Estate Tax Law",
            text: "New York imposes an estate tax on estates of New York residents and on estates of nonresidents that include New York real or tangible property. The tax applies to estates exceeding $6,940,000 (2024). The tax is calculated using a graduated rate schedule. Certain deductions and credits are available...",
            score: 0.90,
            sourceUrl: "https://www.tax.ny.gov/",
            citation: "NY Tax Law § 951",
            year: "2024"
        }
    ],
    "business deductions": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 162 - Trade or Business Expenses",
            text: "There shall be allowed as a deduction all ordinary and necessary expenses paid or incurred during the taxable year in carrying on any trade or business. This includes salaries, rent, utilities, supplies, travel expenses, and other costs directly related to business operations. The expenses must be reasonable in amount and directly connected to the business...",
            score: 0.95,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 162",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 535 - Business Expenses",
            text: "Publication 535 explains what business expenses are deductible, how to report them, and what records to keep. It covers common business deductions including vehicle expenses, travel, meals, home office, depreciation, and employee benefits. The publication includes examples and worksheets...",
            score: 0.92,
            sourceUrl: "https://www.irs.gov/publications/p535",
            citation: "IRS Pub 535",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "cfr",
            taxType: "income",
            title: "26 CFR § 1.162-1 - Business Expenses",
            text: "This regulation provides detailed rules for deducting business expenses under section 162. It explains what constitutes a trade or business, what expenses are ordinary and necessary, and how to allocate expenses between business and personal use. The regulation includes examples and special rules for various types of expenses...",
            score: 0.89,
            sourceUrl: "https://www.ecfr.gov/title-26",
            citation: "26 CFR § 1.162-1",
            year: "2024"
        }
    ],
    "charitable contributions": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 170 - Charitable Contributions",
            text: "A deduction is allowed for any charitable contribution made within the taxable year. The deduction is limited to a percentage of the taxpayer's contribution base, which varies depending on the type of property donated and the type of organization. Cash contributions to public charities are generally deductible up to 60% of adjusted gross income...",
            score: 0.94,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 170",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 526 - Charitable Contributions",
            text: "Publication 526 explains how to claim a deduction for charitable contributions, what organizations qualify, what property can be deducted, and what records to keep. It covers cash contributions, property donations, volunteer expenses, and special rules for noncash contributions...",
            score: 0.91,
            sourceUrl: "https://www.irs.gov/publications/p526",
            citation: "IRS Pub 526",
            year: "2024"
        }
    ],
    "depreciation": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 168 - Accelerated Cost Recovery System",
            text: "The Accelerated Cost Recovery System (ACRS) and Modified Accelerated Cost Recovery System (MACRS) provide rules for depreciating business and investment property. Property is assigned to recovery periods ranging from 3 to 50 years depending on the type of property. Various depreciation methods are available, including straight-line, declining balance, and Section 179 expensing...",
            score: 0.96,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 168",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 946 - How to Depreciate Property",
            text: "Publication 946 explains how to depreciate business and investment property, including what property can be depreciated, which depreciation method to use, recovery periods, and how to claim depreciation deductions. It includes depreciation tables and examples...",
            score: 0.93,
            sourceUrl: "https://www.irs.gov/publications/p946",
            citation: "IRS Pub 946",
            year: "2024"
        }
    ],
    "capital gains": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 1221 - Capital Asset Defined",
            text: "For purposes of this subtitle, the term 'capital asset' means property held by the taxpayer (whether or not connected with his trade or business), but does not include inventory, property used in a trade or business, copyrights, and certain other items. Gains and losses from the sale or exchange of capital assets are treated as capital gains and losses...",
            score: 0.95,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 1221",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 1(h) - Capital Gains Rates",
            text: "The maximum rate of tax on net capital gain is 20% for most taxpayers, with lower rates of 15% or 0% applying to taxpayers in lower tax brackets. A 25% rate applies to unrecaptured Section 1250 gain, and a 28% rate applies to collectibles gain. The rates depend on the taxpayer's income level and the type of capital gain...",
            score: 0.92,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 1(h)",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 544 - Sales and Other Dispositions of Assets",
            text: "Publication 544 explains how to report gains and losses from the sale or exchange of property, including how to determine basis, calculate gain or loss, and report transactions on your tax return. It covers capital assets, business property, and special rules for various types of transactions...",
            score: 0.90,
            sourceUrl: "https://www.irs.gov/publications/p544",
            citation: "IRS Pub 544",
            year: "2024"
        }
    ],
    "retirement contributions": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 401 - Qualified Pension Plans",
            text: "A qualified pension plan allows employees to make pre-tax contributions to a retirement account, reducing current taxable income. Employers may also make matching contributions. Contributions grow tax-deferred until withdrawal. For 2024, the contribution limit for 401(k) plans is $23,000, with an additional $7,500 catch-up contribution for those 50 and older...",
            score: 0.94,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 401",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 408 - Individual Retirement Accounts",
            text: "Individual Retirement Accounts (IRAs) allow individuals to make tax-deductible or tax-free contributions to retirement savings. Traditional IRAs provide tax deductions for contributions, while Roth IRAs provide tax-free withdrawals. For 2024, the contribution limit is $7,000, with an additional $1,000 catch-up contribution for those 50 and older...",
            score: 0.91,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 408",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 590-A - Contributions to Individual Retirement Arrangements",
            text: "Publication 590-A explains the rules for contributing to IRAs, including contribution limits, deduction limits, and who can contribute. It covers traditional IRAs, Roth IRAs, and SEP-IRAs. The publication includes worksheets and examples...",
            score: 0.88,
            sourceUrl: "https://www.irs.gov/publications/p590a",
            citation: "IRS Pub 590-A",
            year: "2024"
        }
    ],
    "home office deduction": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 280A - Disallowance of Certain Expenses",
            text: "No deduction is allowed for expenses related to the business use of a home unless the home is used exclusively and regularly as the principal place of business, a place to meet clients, or in connection with a separate structure. The deduction is limited to the gross income derived from the business use, and certain expenses are not deductible...",
            score: 0.93,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 280A",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 587 - Business Use of Your Home",
            text: "Publication 587 explains how to claim a deduction for business use of your home, including eligibility requirements, how to calculate the deduction, and what expenses are deductible. It covers both the regular method and the simplified method for calculating the home office deduction...",
            score: 0.90,
            sourceUrl: "https://www.irs.gov/publications/p587",
            citation: "IRS Pub 587",
            year: "2024"
        }
    ],
    "self employment tax": [
        {
            jurisdiction: "federal",
            state: null,
            docType: "irc",
            taxType: "income",
            title: "IRC Section 26 USC § 1401 - Tax on Self-Employment Income",
            text: "In addition to income tax, self-employed individuals must pay self-employment tax on net earnings from self-employment. The self-employment tax rate is 15.3%, consisting of 12.4% for Social Security and 2.9% for Medicare. For 2024, the Social Security portion applies to the first $168,600 of net earnings. Self-employed individuals can deduct half of the self-employment tax as an adjustment to income...",
            score: 0.95,
            sourceUrl: "https://uscode.house.gov/view.xhtml?path=/prelim@title26",
            citation: "26 USC § 1401",
            year: "2024"
        },
        {
            jurisdiction: "federal",
            state: null,
            docType: "publication",
            taxType: "income",
            title: "IRS Publication 334 - Tax Guide for Small Business",
            text: "Publication 334 provides comprehensive guidance for small business owners, including how to report self-employment income, calculate self-employment tax, make estimated tax payments, and claim business deductions. It covers sole proprietorships, partnerships, and other business structures...",
            score: 0.92,
            sourceUrl: "https://www.irs.gov/publications/p334",
            citation: "IRS Pub 334",
            year: "2024"
        }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const exampleTags = document.querySelectorAll('.example-tag');

    // Search function
    function performSearch() {
        const query = searchQuery.value.trim().toLowerCase();
        
        if (!query) {
            showPlaceholder();
            return;
        }

        // Show loading state
        showLoading();

        // Simulate API delay
        setTimeout(() => {
            // Find matching sample results or generate generic results
            let results = findMatchingResults(query);
            
            if (results && results.length > 0) {
                displayResults(query, results);
            } else {
                displayGenericResults(query);
            }
        }, 800);
    }

    // Find matching results from sample data
    function findMatchingResults(query) {
        const queryLower = query.toLowerCase();
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
        
        // Exact or partial match
        for (const [key, results] of Object.entries(sampleResults)) {
            const keyLower = key.toLowerCase();
            if (queryLower.includes(keyLower) || keyLower.includes(queryLower)) {
                return results;
            }
            
            // Check if significant words match
            const keyWords = keyLower.split(/\s+/);
            const matchCount = queryWords.filter(qw => 
                keyWords.some(kw => kw.includes(qw) || qw.includes(kw))
            ).length;
            
            if (matchCount >= 2 && matchCount >= queryWords.length * 0.5) {
                return results;
            }
        }
        
        // Check for common tax terms
        const taxTerms = {
            'nexus': 'sales tax nexus',
            '1040': 'form 1040',
            'publication 17': 'irs publication 17',
            'pub 17': 'irs publication 17',
            'deduction': 'new york tax deductions',
            'exemption': 'california sales tax exemptions',
            'estate': 'estate tax',
            'business': 'business deductions',
            'charitable': 'charitable contributions',
            'depreciation': 'depreciation',
            'capital gain': 'capital gains',
            'retirement': 'retirement contributions',
            'home office': 'home office deduction',
            'self employment': 'self employment tax',
            'self-employed': 'self employment tax'
        };
        
        for (const [term, key] of Object.entries(taxTerms)) {
            if (queryLower.includes(term) && sampleResults[key]) {
                return sampleResults[key];
            }
        }
        
        return null;
    }

    // Display generic results
    function displayGenericResults(query) {
        const filters = getActiveFilters();
        const results = generateGenericResults(query, filters);
        displayResults(query, results);
    }

    // Generate generic results based on query
    function generateGenericResults(query, filters) {
        const results = [];
        const jurisdictions = filters.jurisdiction ? [filters.jurisdiction] : ['federal', 'state'];
        const states = filters.state ? [filters.state] : ['NY', 'CA', 'NJ'];
        
        for (let i = 0; i < 3; i++) {
            const jurisdiction = jurisdictions[i % jurisdictions.length];
            const state = jurisdiction === 'state' ? states[i % states.length] : null;
            
            results.push({
                jurisdiction: jurisdiction,
                state: state,
                docType: filters.docType || (i === 0 ? 'statute' : i === 1 ? 'publication' : 'regulation'),
                taxType: filters.taxType || 'income',
                title: `${jurisdiction === 'federal' ? 'Federal' : state} Tax Document - ${query}`,
                text: `This document contains relevant information about "${query}". The content covers various aspects including definitions, requirements, procedures, and examples related to your search query. This is a sample result demonstrating how the RAG system would retrieve and present relevant tax information from the corpus.`,
                score: 0.95 - (i * 0.05),
                sourceUrl: jurisdiction === 'federal' ? 'https://www.irs.gov' : `https://www.${state.toLowerCase()}.gov`,
                citation: `${jurisdiction === 'federal' ? '26 USC' : state} § ${1000 + i}`,
                year: "2024"
            });
        }
        
        return results;
    }

    // Display results
    function displayResults(query, results) {
        const filters = getActiveFilters();
        const filteredResults = applyFilters(results, filters);
        
        if (filteredResults.length === 0) {
            showNoResults(query);
            return;
        }

        let html = `
            <div class="results-header">
                <h3>
                    Search Results for: "${query}"
                    <span class="results-count">(${filteredResults.length} found)</span>
                </h3>
            </div>
        `;

        filteredResults.forEach(result => {
            const jurisdictionBadge = result.jurisdiction === 'federal' 
                ? '<span class="result-badge federal">Federal</span>'
                : `<span class="result-badge state">${result.state}</span>`;
            
            const docTypeLabel = getDocTypeLabel(result.docType);
            
            html += `
                <div class="result-item">
                    <div class="result-header">
                        ${jurisdictionBadge}
                        <span class="result-badge doc-type">${docTypeLabel}</span>
                    </div>
                    <h4>${result.title}</h4>
                    <p class="result-text">${result.text}</p>
                    <div class="result-meta">
                        <span>
                            <i class="fas fa-link"></i>
                            <a href="${result.sourceUrl}" target="_blank">View Source</a>
                        </span>
                        <span>
                            <i class="fas fa-calendar"></i>
                            Updated: ${result.year}
                        </span>
                        <span>
                            <i class="fas fa-tag"></i>
                            Citation: ${result.citation}
                        </span>
                    </div>
                </div>
            `;
        });

        searchResults.innerHTML = html;
    }

    // Get active filters
    function getActiveFilters() {
        return {
            jurisdiction: document.getElementById('jurisdictionFilter').value,
            state: document.getElementById('stateFilter').value,
            docType: document.getElementById('docTypeFilter').value,
            taxType: document.getElementById('taxTypeFilter').value
        };
    }

    // Apply filters to results
    function applyFilters(results, filters) {
        return results.filter(result => {
            if (filters.jurisdiction && result.jurisdiction !== filters.jurisdiction) return false;
            if (filters.state && result.state !== filters.state) return false;
            if (filters.docType && result.docType !== filters.docType) return false;
            if (filters.taxType && result.taxType !== filters.taxType) return false;
            return true;
        });
    }

    // Get document type label
    function getDocTypeLabel(docType) {
        const labels = {
            'irc': 'IRC',
            'cfr': 'CFR',
            'publication': 'Publication',
            'form': 'Form',
            'statute': 'Statute',
            'regulation': 'Regulation',
            'bulletin': 'Bulletin',
            'ruling': 'Ruling',
            'notice': 'Notice'
        };
        return labels[docType] || docType;
    }

    // Show placeholder
    function showPlaceholder() {
        searchResults.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-search"></i>
                <h3>Ready to Search</h3>
                <p>Enter a query above to search the tax corpus</p>
                <div class="example-queries">
                    <p class="example-title">Try these example queries:</p>
                    <div class="example-tags">
                        <span class="example-tag" data-query="sales tax nexus requirements">sales tax nexus requirements</span>
                        <span class="example-tag" data-query="Form 1040 instructions">Form 1040 instructions</span>
                        <span class="example-tag" data-query="New York tax deductions">New York tax deductions</span>
                        <span class="example-tag" data-query="California sales tax exemptions">California sales tax exemptions</span>
                        <span class="example-tag" data-query="IRS publication 17">IRS publication 17</span>
                        <span class="example-tag" data-query="business deductions">business deductions</span>
                        <span class="example-tag" data-query="charitable contributions">charitable contributions</span>
                        <span class="example-tag" data-query="capital gains">capital gains</span>
                        <span class="example-tag" data-query="retirement contributions">retirement contributions</span>
                        <span class="example-tag" data-query="estate tax">estate tax</span>
                        <span class="example-tag" data-query="home office deduction">home office deduction</span>
                        <span class="example-tag" data-query="self employment tax">self employment tax</span>
                    </div>
                </div>
            </div>
        `;
        
        // Re-attach event listeners to example tags
        attachExampleTagListeners();
    }

    // Show loading state
    function showLoading() {
        searchResults.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Searching the tax corpus...</p>
            </div>
        `;
    }

    // Show no results
    function showNoResults(query) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No Results Found</h3>
                <p>No documents match your search query "${query}" with the current filters.</p>
                <p style="margin-top: 1rem;">Try adjusting your filters or using different search terms.</p>
            </div>
        `;
    }

    // Attach event listeners to example tags
    function attachExampleTagListeners() {
        document.querySelectorAll('.example-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                searchQuery.value = query;
                performSearch();
            });
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchQuery.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Document type options by jurisdiction
    // Note: Document types are NOT completely common between federal and state:
    // - Federal-specific: IRC, CFR
    // - State-specific: Statute, Bulletin, Ruling, Notice
    // - Common to both: Publication, Form, Regulation
    // The dropdown dynamically updates based on jurisdiction selection
    const docTypeOptions = {
        all: [
            { value: '', label: 'All Types' },
            { value: 'irc', label: 'IRC (Internal Revenue Code)', jurisdiction: 'federal' },
            { value: 'cfr', label: 'CFR (Code of Federal Regulations)', jurisdiction: 'federal' },
            { value: 'publication', label: 'Publication', jurisdiction: 'both' },
            { value: 'form', label: 'Form & Instructions', jurisdiction: 'both' },
            { value: 'statute', label: 'State Statute', jurisdiction: 'state' },
            { value: 'regulation', label: 'State Regulation', jurisdiction: 'state' },
            { value: 'bulletin', label: 'Bulletin/Notice', jurisdiction: 'state' },
            { value: 'ruling', label: 'Ruling', jurisdiction: 'state' }
        ],
        federal: [
            { value: '', label: 'All Types' },
            { value: 'irc', label: 'IRC (Internal Revenue Code)' },
            { value: 'cfr', label: 'CFR (Code of Federal Regulations)' },
            { value: 'publication', label: 'IRS Publication' },
            { value: 'form', label: 'Form & Instructions' }
        ],
        state: [
            { value: '', label: 'All Types' },
            { value: 'statute', label: 'State Statute' },
            { value: 'regulation', label: 'State Regulation' },
            { value: 'bulletin', label: 'Bulletin/Notice' },
            { value: 'ruling', label: 'Ruling' },
            { value: 'publication', label: 'State Publication' },
            { value: 'form', label: 'State Form & Instructions' }
        ]
    };

    // Update document type options based on jurisdiction selection
    function updateDocTypeOptions() {
        const jurisdictionFilter = document.getElementById('jurisdictionFilter');
        const docTypeFilter = document.getElementById('docTypeFilter');
        
        if (!jurisdictionFilter || !docTypeFilter) return;
        
        const jurisdiction = jurisdictionFilter.value;
        const currentValue = docTypeFilter.value;
        
        // Determine which options to show
        let optionsToShow;
        if (jurisdiction === 'federal') {
            optionsToShow = docTypeOptions.federal;
        } else if (jurisdiction === 'state') {
            optionsToShow = docTypeOptions.state;
        } else {
            optionsToShow = docTypeOptions.all;
        }
        
        // Clear and rebuild options
        docTypeFilter.innerHTML = '';
        optionsToShow.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            docTypeFilter.appendChild(option);
        });
        
        // Restore previous selection if it's still available
        if (currentValue && optionsToShow.some(opt => opt.value === currentValue)) {
            docTypeFilter.value = currentValue;
        } else {
            docTypeFilter.value = '';
        }
    }

    // Filter change handlers
    ['jurisdictionFilter', 'stateFilter', 'docTypeFilter', 'taxTypeFilter'].forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                // Update doc type options when jurisdiction changes
                if (filterId === 'jurisdictionFilter') {
                    updateDocTypeOptions();
                }
                
                const query = searchQuery.value.trim();
                if (query) {
                    performSearch();
                }
            });
        }
    });
    
    // Initialize doc type options on page load
    updateDocTypeOptions();

    // Clear filters
    clearFiltersBtn.addEventListener('click', function() {
        document.getElementById('jurisdictionFilter').value = '';
        document.getElementById('stateFilter').value = '';
        document.getElementById('docTypeFilter').value = '';
        document.getElementById('taxTypeFilter').value = '';
        
        const query = searchQuery.value.trim();
        if (query) {
            performSearch();
        } else {
            showPlaceholder();
        }
    });

    // Initial setup
    attachExampleTagListeners();
});

