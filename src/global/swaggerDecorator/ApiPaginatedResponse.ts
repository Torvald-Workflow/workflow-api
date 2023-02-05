import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';
import { PaginatedElementDto } from '../dto/PaginatedElementDto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedElementDto, UserEntity),
    ApiOkResponse({
      description: 'Successfully fetched paginated data.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedElementDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
