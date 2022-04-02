import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });
    }

    // Transaction will be executed accroding to the order
    // Average wont since prisma may want to optimise
    public cleanDb() {
        this.$transaction([
            this.bookMark.deleteMany(),
            this.user.deleteMany()
        ]);  
    }
}
