export const handleLettersOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/

    if (!regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'Delete') {
        e.preventDefault()
    }
}