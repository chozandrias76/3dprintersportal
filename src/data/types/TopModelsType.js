/**
 * Created by colin on 12/7/16.
 */
import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
  GraphQLID as ID,
} from 'graphql';

const TopModelsType = new ObjectType({
  name: 'TopModels',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: new NonNull(StringType) },
    url: { type: new NonNull(StringType) },
    public_url: { type: new NonNull(StringType) },
    thumbnail: { type: new NonNull(StringType) },
    creator: { type: new ObjectType({
      name: 'Creator',
      fields: {
        id: { type: new NonNull(ID) },
        name: { type: new NonNull(StringType) },
        url: { type: new NonNull(StringType) },
        public_url: { type: new NonNull(StringType) },
        thumbnail: { type: new NonNull(StringType) },
      },
    })},
  },
});



export default TopModelsType;
