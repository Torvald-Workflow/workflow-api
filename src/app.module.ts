import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { LogbookModule } from './logbook/logbook.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    LogbookModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
