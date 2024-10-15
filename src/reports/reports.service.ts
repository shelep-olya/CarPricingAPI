import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report-dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>){}

    async create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        report.user = user; 
        return await this.repo.save(report);
    }
    async changeApproval(id: string, approved: boolean){
        const report = await this.repo.findOne({where: {id: parseInt(id)}});
        if(!report){
            throw new NotFoundException('report not found');
        }
        report.approved = approved;
        return this.repo.save(report);
    }

}
