import { FastifyInstance, FastifyServerOptions } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import { faker, AddressDefinitions } from '@faker-js/faker';

function createRandomAddress(contentId: string): ContentPropsType {
  return {
    contentId: contentId,
    _id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    city: [faker.address.city()],
    state: [faker.address.state()],
    zip: faker.address.zipCode(),
    country: [faker.address.country()],
    company: faker.helpers.arrayElement('Google,Facebook,Microsoft,Amazon'.split(',')),
    job: faker.name.jobTitle(),
    avatar: faker.image.avatar(),
    birthday: `${faker.date.past()}`,
    website: faker.internet.url(),
    notes: faker.lorem.paragraph(),
  };
}

const ContentProps = Type.Object({
  contentId: Type.String(),
  _id: Type.String(),
  name: Type.String(),
  surname: Type.String(),
  email: Type.String(),
  phone: Type.String(),
  address: Type.String(),
  city: Type.Array(Type.String()),
  state: Type.Array(Type.String()),
  zip: Type.String(),
  country: Type.Array(Type.String()),
  company: Type.String(),
  job: Type.String(),
  avatar: Type.String(),
  birthday: Type.String(),
  website: Type.String(),
  notes: Type.String(),
});

const ContentSchema = {
  body: {contentId: Type.String()},
  response: {
    200: ContentProps,
  },
}

type ContentPropsType = Static<typeof ContentProps>

type omitKeys = '_id' | 'name' | 'surname' | 'email' | 'phone' | 'address' | 'city' | 'state' | 'zip' | 'country' | 'company' | 'job' | 'avatar' | 'birthday' | 'website' | 'notes';

export default async function (f: FastifyInstance, opts: FastifyServerOptions, next: Function) {

  f.post<{
    Body: Omit<ContentPropsType, omitKeys>,
    Reply: ContentPropsType
  }>(
    '/',
    { schema: ContentSchema },
    (request, reply) => {
      const {contentId} = request.body;
      const address = createRandomAddress(contentId);
      reply.status(200).send(address);
    }
  )

  next();
}
