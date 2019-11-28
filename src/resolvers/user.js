export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    createUser: async(parent, {input}, { models }) => {
    try { 
      const user = await models.User.create(input)
      const userId = user.id
      await models.UserProfile.create({...input.profile,
         userId: userId});
      return user
    }catch(err){
      console.log(err)

    }

    },
  },
};
