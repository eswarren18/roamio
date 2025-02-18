export const FormErrorAlert = ({ errors }) => {
    if (!errors || errors.length === 0) return null

    return (
        <div className="flex items-center text-gray-600 rounded-2xl bg-yellow-300 mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-12 w-1/5 text-yellow-600 pl-3 pr-2 border-r border-gray-600"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
            </svg>
            <div className="bg-yellow-300 text-gray-600 text-xs items-center py-4 px-2 rounded-r-2xl">
                <div className="font-bold">The following errors occured:</div>
                {errors.map((error, index) => (
                    <div className="ml-2" key={index}>
                        • {error}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const validateForm = ({ requiredFields, urlFields }) => {
    const errors = []

    // Validate required fields are not empty
    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value) {
            const formattedKey = key
                .split('_')
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(' ')
            errors.push(`${formattedKey} is required`)
        }
    }

    // Validate that dates are in order
    if (requiredFields.start_date && requiredFields.end_date) {
        if (
            new Date(requiredFields.start_date) >
            new Date(requiredFields.end_date)
        ) {
            errors.push('Start date must come before end date')
        }
    }

    // Validate that images are valid URLs
    if (urlFields) {
        if (urlFields.trip_image !== undefined && urlFields.trip_image) {
            try {
                new URL(urlFields.trip_image)
            } catch (error) {
                errors.push('Trip image must be a valid URL or left blank')
            }
        }
    }

    return errors
}
