import { Url } from 'url';
import { SocksProxy, SocksClientOptions } from 'socks';
import tls from 'tls';
import { AgentOptions } from 'agent-base';
import net from 'net';
import _SocksProxyAgent from './agent';
type SocketConnectOpts = net.SocketConnectOpts;

function createSocksProxyAgent(
	opts: string | createSocksProxyAgent.SocksProxyAgentOptions
): _SocksProxyAgent {
	return new _SocksProxyAgent(opts);
}

namespace createSocksProxyAgent {
	interface BaseSocksProxyAgentOptions {
		host?: string | null;
		port?: string | number | null;
		username?: string | null;
		tls?: tls.ConnectionOptions | null;
	}

	export interface SocksProxyAgentOptions
		extends AgentOptions,
			BaseSocksProxyAgentOptions,
			Partial<Omit<Url & SocksProxy, keyof BaseSocksProxyAgentOptions>> {
				socket_options?: SocketConnectOpts
			}

	export type SocksProxyAgent = _SocksProxyAgent;
	export const SocksProxyAgent = _SocksProxyAgent;

	createSocksProxyAgent.prototype = _SocksProxyAgent.prototype;
}

export = createSocksProxyAgent;
