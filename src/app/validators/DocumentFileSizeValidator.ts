class DocumentFileSizeValidator {
    private fileSizeInBytes: number;
    private maxFileSizeInBytes: number = 10971520;

    constructor(fileSize: number) {
        this.fileSizeInBytes = fileSize;
    }

    validateFileSize(): boolean {
        return this.fileSizeInBytes <= this.maxFileSizeInBytes;
    }

    getErrorMessage(): string {
        return "Maximum file size accepted is 10MB.";
    }
}

export default DocumentFileSizeValidator;

export function getFileSize(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
