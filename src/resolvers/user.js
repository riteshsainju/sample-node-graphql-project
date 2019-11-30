import bcrypt from 'bcrypt'
import _ from 'lodash';
import { tryLogin } from '../auth';
import requiresAuth from '../permissions';

export default {
  Query: {
    getUser: requiresAuth.createResolver((parent, { id }, { models }) => models.User.findOne({ where: { id } })),
    allUsers: requiresAuth.createResolver((parent, args, { models,user }) =>models.User.findAll())
  },

  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),

    register: async(parent, {input}, { models }) => {
    try { 
      const hashedPassword = await bcrypt.hash(input.password, 12);
      const user = await models.User.create({...input, password: hashedPassword })
      const userId = user.id
      await models.UserProfile.create({...input.profile,
         userId: userId});
      return {
          success: true,
          user,
        };    
    }catch(err){
      return {
        success: false,
        errors: [{ path: 'name', message: err.message }],
      };
    }

    },
  },

};
