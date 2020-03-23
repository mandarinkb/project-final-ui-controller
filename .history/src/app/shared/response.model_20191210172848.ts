export class Response {
    status: number;
    message: string ;
    id: number;
    departmantId: number;
    departmentName: string;
    username: string;
    role: string;
    tokenType: string;
    accessToken: string;
    exception: string; // กรณี error
    token: string;
}
