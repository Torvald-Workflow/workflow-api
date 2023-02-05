import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interfaces';

export class PageMetaDto {
  @ApiProperty()
  readonly currentPage: number;

  @ApiProperty()
  readonly totalPages: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly itemsPerPage: number;

  @ApiProperty()
  readonly totalItems: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.currentPage = pageOptionsDto.page;
    this.itemsPerPage = pageOptionsDto.itemsPerPage;
    this.totalItems = itemCount;
    this.totalPages = Math.ceil(itemCount / pageOptionsDto.itemsPerPage);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPages;
  }
}
