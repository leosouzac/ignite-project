import { AppError } from "@errors/AppError";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DaysJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      driver_license: "664168",
      email: "asdkbas@sdasd.br",
      name: "Carlos",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("asdkbas@sdasd.br");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should be not able to send a an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ka@uj.gr")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be  able to create users token", async () => {
    const generateTokenMail = spyOn(userRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      driver_license: "123456",
      email: "abome@greg.com",
      name: "Carlos calor",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("abome@greg.com");

    expect(generateTokenMail).toBeCalled();
  });
});
