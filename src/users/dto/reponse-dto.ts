import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {
    attributes: {
        firstName: string;
        lastName: string;
        email: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        address?: Object;
        details?: Object;
        role: Object;
        userPermissions?: Array<Object>;
    };
    id: number;
}


export class exampleJsonObjectForService {
    
    services :[{

        name: string,
        rate:number
    },
    {
        name: string,
        rate:number
    }]
}

  
