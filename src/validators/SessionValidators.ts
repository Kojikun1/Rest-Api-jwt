import { celebrate, Segments, Joi } from 'celebrate';

export default {
    create: celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required()
            })
        })
}