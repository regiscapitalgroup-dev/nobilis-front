export const getMaxBirthdayDate = (): string => {
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 18)
    return maxDate.toISOString().split('T')[0]
}