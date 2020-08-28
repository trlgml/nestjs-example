import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { InjectModel } from '../../transforms/typeorm.transform';

@Injectable()
export class TypeormService {
  constructor(
    @InjectModel(Photo)
    private readonly phoneRepository: Repository<Photo>,
  ) { }
  async getSql() {
    // userRepository.find({
    //     select: ["firstName", "lastName"],
    //     relations: ["profile", "photos", "videos"],
    //     where: {
    //         firstName: "Timber",
    //         lastName: "Saw"
    //     },
    //     order: {
    //         name: "ASC",
    //         id: "DESC"
    //     },
    //     skip: 5,
    //     take: 10,
    //     cache: true
    // });
    const story = await this.phoneRepository
      .createQueryBuilder()
      .select("name")
      .where("id = :id", { id: 1 })
      .getOne();
    return story;
  }
  async setSql() {
    const story = await this.phoneRepository
      .createQueryBuilder()
      .insert()
      .values([
        {
          name: 'name3',
          description: 'description3',
          filename: 'filename3',
          views: 4,
          isPublished: true
        }
      ])
      .execute();
    return story;
  }
  async updateSql() {
    const story = await this.phoneRepository
      .createQueryBuilder()
      .update()
      .set({ description: "descriptionupdate" })
      .where("id = :id", { id: 1 })
      .execute();
    return story;
  }
  async delSql() {
    const story = await this.phoneRepository
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: 1 })
      .execute();
    return story;
  }
}
