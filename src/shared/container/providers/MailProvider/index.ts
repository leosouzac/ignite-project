import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./Implementations/EtherealMailProvider";

container.registerSingleton<IMailProvider>(
  "EtherealMailProvider",
  EtherealMailProvider
);
