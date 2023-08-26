import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * This decorator is used to get the current user id from the request object.
 */
export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user.userId;
  },
);
