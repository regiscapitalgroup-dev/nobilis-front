export const urlToFile = async (
    url: string,
    filename: string,
    mimeType?: string
): Promise<File> => {
    console.log(url);
    const response = await fetch(url)
    const blob = await response.blob()
    return new File([blob], filename, {
        type: mimeType || blob.type,
    })
}

export const getFileNameFromUrl = (url: string): string => {
    try {
        const parsedUrl = new URL(url)
        return parsedUrl.pathname.split('/').pop() || ''
    } catch {
        return ''
    }
}