import { Body, Req, UseGuards, ExecutionContext } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { LoginUserArgs } from './dto/args/login-user.args';
import { UserObjectType } from './user.model';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation((returns) => UserObjectType, { nullable: true })
  @UseGuards(LocalAuthGuard)
  async login(@Args() loginUserArgs: LoginUserArgs, @Context() ctx) {
    return this.authService.login(ctx.user);
  }

  @Query((returns) => UserObjectType)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: UserObjectType) {
    return this.usersService.findOne(user.username);
  }
}
