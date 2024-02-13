import { Injectable, Res } from "@nestjs/common"

// @Injectable()
export class ApiResponse{
    constructor(
        public statusCode: number,
        public data:{}
    ){}

    apiResponse(res){
        return res.status(this.statusCode).send({statusCode: this.statusCode, data: this.data})
    }
   
}