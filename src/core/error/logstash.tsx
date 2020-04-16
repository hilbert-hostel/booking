import * as Logstash from 'logstash-client';

const config = {
  type: 'tcp',
  host: '1.1.1.1',
  port: 5000,
};
const createLogstash = () => {
  try {
    return new Logstash(config);
  } catch (error) {
    return null;
  }
};
export const logstash = createLogstash();
