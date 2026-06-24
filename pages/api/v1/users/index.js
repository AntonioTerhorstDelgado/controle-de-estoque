import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
import authorization from "models/authorization.js";
import { ValidationError } from "infra/errors.js";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .post(controller.canRequest("create:user"), postHandler)
  .handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userTryingToPost = request.context.user;
  const userInputValues = request.body;

  if (userInputValues.nome && !userInputValues.username) {
    userInputValues.username = userInputValues.nome
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  if (userInputValues.password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(userInputValues.password)) {
      throw new ValidationError({
        message: "A senha informada não cumpre os requisitos de segurança.",
        action:
          "Certifique-se de que a senha tem pelo menos 6 caracteres, uma letra maiúscula, uma minúscula e um caractere especial.",
      });
    }
  }
  const newUser = await user.create(userInputValues);

  const secureOutputValues = authorization.filterOutput(
    userTryingToPost,
    "read:user",
    newUser,
  );

  return response.status(201).json(secureOutputValues);
}
