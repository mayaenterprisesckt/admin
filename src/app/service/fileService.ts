interface UploadFileResponse {
    success: boolean;
    message: string;
}

class FileService {
    private file: File;
    private fileType: string;
    private accessToken: string;
    constructor(file: File, fileType: string, accessToken: string) {
        this.file = file;
        this.fileType = fileType;
        this.accessToken = accessToken;
    }

    static getFileExtension(fileName: string): string {
        const fileNames: Array<string> = fileName.split(".");

        if (fileNames.length === 0) {
            return "";
        }

        return fileNames[fileNames.length - 1];
    }

    async uploadFile(): Promise<UploadFileResponse> {
        // console.log(this.fileType, this.file);

        // console.log(this.accessToken);
        const uploadResponse = await fetch(
            "https://maya-enterprises-api.herokuapp.com/upload/api",
            {
                headers: {
                    Authorization: this.accessToken as string,
                },
                method: "POST",
                body: this.getFormData(),
            }
        );
        const responseJson = await uploadResponse.json();

        //console.log(responseJson);
        //console.log(uploadResponse);

        if (uploadResponse.status === 405) {
            return {
                success: false,
                message: responseJson.message,
            };
        }

        return {
            success: true,
            message: "Uploaded Successfully",
        };
    }

    private getFormData(): FormData {
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("type", this.fileType);
        //console.log(formData);
        return formData;
    }
}

export default FileService;
