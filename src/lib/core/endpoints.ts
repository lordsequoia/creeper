export type EndpointAdapter = 'fs' | 'zmq' | 'docker' | string;

export type Endpoint = {
  readonly adapter: EndpointAdapter;
};
