export const ROWS_PER_PAGE = 14
export const COLUMNS_PER_ROW = 19
export const TOTAL_PAGE_COUNT = 3600
export const NAVIGATION_BUTTONS_COUNT = 5
export const CONTAINER_PADDING = 11
export const BACKGROUND_PRIMARY = '#cda500'
export const BACKGROUND_SECONDARY = '#b08f07'

export const WEBSITE = { 
    URL_MAX_LENGTH: 80,
    DESCRIPTION_MAX_LENGTH: 60,
    THUMBNAIL: {
        TABLE_DEFAULT: '/images/background_default.jpg',
        IMAGE_PREVIEW_DEFAULT: '/images/Image_preview_default.jpg'
    },
    DEFAULT: {
        url: '',
        description: '',
        image: null,
        thumbnail: { url: '/images/Logo.jpg' },
        categories: [],
        countries: []
    },
    CATEGORIES: [
        {value: 0, displayValue: "Advertising"},
        {value: 1, displayValue: "Animals"},
        {value: 2, displayValue: "Architecture"},
        {value: 3, displayValue: "Art"},
        {value: 4, displayValue: "Biography"},
        {value: 5, displayValue: "Blog"},
        {value: 6, displayValue: "Board Games"},
        {value: 7, displayValue: "Branding"},
        {value: 8, displayValue: "Business"},        
        {value: 9, displayValue: "Cars"},
        {value: 10, displayValue: "Catalog"},
        {value: 11, displayValue: "Community Forum"},
        {value: 12, displayValue: "Digital Marketing"},
        {value: 13, displayValue: "E-commerce"},
        {value: 14, displayValue: "Ecology"},
        {value: 15, displayValue: "Educational"},
        {value: 16, displayValue: "Entertainment"},
        {value: 17, displayValue: "Fashion"},
        {value: 18, displayValue: "Food"},
        {value: 19, displayValue: "Gaming"},
        {value: 20, displayValue: "Job board"},
        {value: 21, displayValue: "Magazine"},
        {value: 22, displayValue: "Media"},
        {value: 23, displayValue: "Movies/TV Shows"},
        {value: 24, displayValue: "Music"},
        {value: 25, displayValue: "News"},
        {value: 26, displayValue: "Non-profit"},
        {value: 27, displayValue: "Personal"},
        {value: 28, displayValue: "Photo-sharing"},
        {value: 29, displayValue: "Podcast"},
        {value: 30, displayValue: "Political"},
        {value: 31, displayValue: "Portfolio", subcategories: [
            {value: 32, displayValue: "Artist Portfolio"},
            {value: 33, displayValue: "Designer Portfolio"},
            {value: 34, displayValue: "Filmmaker Portfolio"},
            {value: 35, displayValue: "Photographer Portfolio"},
            {value: 36, displayValue: "Software Developer Portfolio"},
        ]},            
        {value: 37, displayValue: "Science"},
        {value: 38, displayValue: "Shopping"},
        {value: 39, displayValue: "Social Media"},
        {value: 40, displayValue: "Sport", subcategories: [
            {value: 41, displayValue: "Football"},
            {value: 42, displayValue: "Basketball"},
        ]},
        {value: 43, displayValue: "Streaming"},
        {value: 44, displayValue: "Technology"}, 
        {value: 45, displayValue: "Traveling"},
        {value: 46, displayValue: "Web Design"},
        {value: 47, displayValue: "Web portal"}, 
        {value: 48, displayValue: "Other"},
    ],

    COUNTRIES: [            
            { value: 0, displayValue: "Afghanistan" },
            { value: 1, displayValue: "Albania" },
            { value: 2, displayValue: "Algeria" },
            { value: 3, displayValue: "Andorra" },
            { value: 4, displayValue: "Angola" },            
            { value: 5, displayValue: "Antigua and Barbuda" },
            { value: 6, displayValue: "Argentina" },
            { value: 7, displayValue: "Armenia" },
            { value: 8, displayValue: "Australia" },
            { value: 9, displayValue: "Austria" },
            { value: 10, displayValue: "Azerbaijan" },
            { value: 11, displayValue: "Bahamas" },
            { value: 12, displayValue: "Bahrain" },
            { value: 13, displayValue: "Bangladesh" },
            { value: 14, displayValue: "Barbados" },
            { value: 15, displayValue: "Belarus" },
            { value: 16, displayValue: "Belgium" },
            { value: 17, displayValue: "Belize" },
            { value: 18, displayValue: "Benin" },
            { value: 19, displayValue: "Bhutan" },
            { value: 20, displayValue: "Bolivia" },
            { value: 21, displayValue: "Bosnia and Herzegovina" },
            { value: 22, displayValue: "Botswana" },
            { value: 23, displayValue: "Brazil" },
            { value: 24, displayValue: "Brunei" },
            { value: 25, displayValue: "Bulgaria" },
            { value: 26, displayValue: "Burkina Faso" },
            { value: 27, displayValue: "Burundi" },
            { value: 28, displayValue: "Côte d'Ivoire" },
            { value: 29, displayValue: "Cabo Verde" },
            { value: 30, displayValue: "Cambodia" },
            { value: 31, displayValue: "Cameroon" },
            { value: 32, displayValue: "Canada" },
            { value: 33, displayValue: "Central African Republic" },
            { value: 34, displayValue: "Chad" },
            { value: 35, displayValue: "Chile" },
            { value: 36, displayValue: "China" },
            { value: 37, displayValue: "Colombia" },
            { value: 38, displayValue: "Comoros" },
            { value: 39, displayValue: "Congo" },
            { value: 40, displayValue: "Costa Rica" },
            { value: 41, displayValue: "Croatia" },
            { value: 42, displayValue: "Cuba" },
            { value: 43, displayValue: "Cyprus" },
            { value: 44, displayValue: "Czech Republic" },
            { value: 45, displayValue: "Denmark" },
            { value: 46, displayValue: "Djibouti" },
            { value: 47, displayValue: "Dominica" },
            { value: 48, displayValue: "Dominican Republic" },
            { value: 49, displayValue: "Ecuador" },
            { value: 50, displayValue: "Egypt" },
            { value: 51, displayValue: "El Salvador" },
            { value: 52, displayValue: "Equatorial Guinea" },
            { value: 53, displayValue: "Eritrea" },
            { value: 54, displayValue: "Estonia" },
            { value: 55, displayValue: "Eswatini" },
            { value: 56, displayValue: "Ethiopia" },
            { value: 57, displayValue: "FIji" },
            { value: 58, displayValue: "Finsland" },
            { value: 59, displayValue: "France" },
            { value: 60, displayValue: "Gabon" },
            { value: 61, displayValue: "Gambia" },
            { value: 62, displayValue: "Georgia" },
            { value: 63, displayValue: "Germany" },
            { value: 64, displayValue: "Ghana" },
            { value: 65, displayValue: "Greece" },
            { value: 66, displayValue: "Grenada" },
            { value: 67, displayValue: "Guatemala" },
            { value: 68, displayValue: "Guinea" },
            { value: 69, displayValue: "Guinea-Bissau" },
            { value: 70, displayValue: "Guyana" },
            { value: 71, displayValue: "Haiti" },
            { value: 72, displayValue: "Holy See" },
            { value: 73, displayValue: "Honduras" },
            { value: 74, displayValue: "Hungary" },
            { value: 75, displayValue: "Iceland" },
            { value: 76, displayValue: "India" },
            { value: 77, displayValue: "Indonesia" },
            { value: 78, displayValue: "Iran" },
            { value: 79, displayValue: "Iraq" },
            { value: 80, displayValue: "Ireland" },
            { value: 81, displayValue: "Israel" },
            { value: 82, displayValue: "Italy" },
            { value: 83, displayValue: "Jamaica" },
            { value: 84, displayValue: "Japan" },
            { value: 85, displayValue: "Jordan" },
            { value: 86, displayValue: "Kazakhstan" },
            { value: 87, displayValue: "Kenya" },
            { value: 88, displayValue: "Kiribati" },
            { value: 89, displayValue: "Kuwait" },
            { value: 90, displayValue: "Kyrgyzstan" },
            { value: 91, displayValue: "Laos" },
            { value: 92, displayValue: "Latvia" },
            { value: 93, displayValue: "Lebanon" },
            { value: 94, displayValue: "Lesotho" },
            { value: 95, displayValue: "Liberia" },
            { value: 96, displayValue: "Libya" },
            { value: 97, displayValue: "Liechtenstein" },
            { value: 98, displayValue: "Lithuania" },
            { value: 99, displayValue: "Luxembourgh" },
            { value: 100, displayValue: "Madagascar" },
            { value: 101, displayValue: "Malawi" },
            { value: 102, displayValue: "Malaysia" },
            { value: 103, displayValue: "Maldives" },
            { value: 104, displayValue: "Mali" },
            { value: 105, displayValue: "Malta" },
            { value: 106, displayValue: "Marshall Islands" },
            { value: 107, displayValue: "Mauritania" },
            { value: 108, displayValue: "Mauritius" },
            { value: 109, displayValue: "Mexico" },
            { value: 110, displayValue: "Micronesia" },
            { value: 111, displayValue: "Moldova" },
            { value: 112, displayValue: "Monaco" },
            { value: 113, displayValue: "Mongolia" },
            { value: 114, displayValue: "Montenegro" },
            { value: 115, displayValue: "Morocco" },
            { value: 116, displayValue: "Mozambique" },
            { value: 117, displayValue: "Myanmar" },
            { value: 118, displayValue: "Namibia" },
            { value: 119, displayValue: "Nauru" },
            { value: 120, displayValue: "Nepal" },
            { value: 121, displayValue: "Netherlands" },
            { value: 122, displayValue: "New Zealand" },
            { value: 123, displayValue: "Nicaragua" },
            { value: 124, displayValue: "Niger" },
            { value: 125, displayValue: "Nigeria" },
            { value: 126, displayValue: "North Korea" },
            { value: 127, displayValue: "North Macedonia" },
            { value: 128, displayValue: "Norway" },
            { value: 129, displayValue: "Oman" },
            { value: 130, displayValue: "Pakistan" },
            { value: 131, displayValue: "Palau" },
            { value: 132, displayValue: "Palestine State" },
            { value: 133, displayValue: "Panama" },
            { value: 134, displayValue: "Papua New Guinea" },
            { value: 135, displayValue: "Paraguay" },
            { value: 136, displayValue: "Peru" },
            { value: 137, displayValue: "Philippines" },
            { value: 138, displayValue: "Poland" },
            { value: 139, displayValue: "Qatar" },
            { value: 140, displayValue: "Romania" },
            { value: 141, displayValue: "Russia" },
            { value: 142, displayValue: "Rwanda" },
            { value: 143, displayValue: "Saint Kitts and Nevis" },
            { value: 144, displayValue: "Saint Lucia" },
            { value: 145, displayValue: "Saint Vincent and the Grenadines" },
            { value: 146, displayValue: "Samoa" },
            { value: 147, displayValue: "San Marino" },
            { value: 148, displayValue: "Sao Tome And Principe" },
            { value: 149, displayValue: "Saudi Arabia" },
            { value: 150, displayValue: "Senegal" },
            { value: 151, displayValue: "Serbia" },
            { value: 152, displayValue: "Seychelles" },
            { value: 153, displayValue: "Sierra Leone" },
            { value: 154, displayValue: "Singapore" },
            { value: 155, displayValue: "Slovakia" },
            { value: 156, displayValue: "Slovenia" },
            { value: 157, displayValue: "Solomon Islands" },
            { value: 158, displayValue: "Somalia" },
            { value: 159, displayValue: "South Africa" },
            { value: 160, displayValue: "South Korea" },
            { value: 161, displayValue: "South Sudan" },
            { value: 162, displayValue: "Spain" },
            { value: 163, displayValue: "Sri Lanka" },
            { value: 164, displayValue: "Sudan" },
            { value: 165, displayValue: "Suriname" },
            { value: 166, displayValue: "Sweden" },
            { value: 167, displayValue: "Switzerland" },
            { value: 168, displayValue: "Syria" },
            { value: 169, displayValue: "Tajikistan" },
            { value: 170, displayValue: "Tanzania" },
            { value: 171, displayValue: "Thailand" },
            { value: 172, displayValue: "Timor-Leste" },
            { value: 173, displayValue: "Togo" },
            { value: 174, displayValue: "Tonga" },
            { value: 175, displayValue: "Trinidad and Tobago" },
            { value: 176, displayValue: "Tunisia" },
            { value: 177, displayValue: "Turkey" },
            { value: 178, displayValue: "Turkmenistan" },
            { value: 179, displayValue: "Tuvalu" },
            { value: 180, displayValue: "Uganda" },
            { value: 181, displayValue: "Ukraine" },
            { value: 182, displayValue: "United  Arab Emirates" },
            { value: 183, displayValue: "United Kingdom" },
            { value: 184, displayValue: "United States of America" },
            { value: 185, displayValue: "Uruguay" },
            { value: 186, displayValue: "Uzbekistan" },
            { value: 187, displayValue: "Vanuatu" },
            { value: 188, displayValue: "Venezuela" },
            { value: 189, displayValue: "Vietnam" },
            { value: 190, displayValue: "Yemen" },
            { value: 191, displayValue: "Zambia" },
            { value: 192, displayValue: "Zimbabwe" }                                    
    ]
}

export const ALLOWED_FORMATS = 'image/jpeg, image/jpg, image/png'
export const LINKED_IN_PROFILE_URL = "https://www.linkedin.com/in/nemanja-apostolovic-9178a0156/"