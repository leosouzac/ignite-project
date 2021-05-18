import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/Implementations/DaysJsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
