// eslint-disable-next-line no-irregular-whitespace
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { getAccessToken, removeAll } from '@/utils/authority';
import { history } from 'umi';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// eslint-disable-next-line no-irregular-whitespace
/** 异常处理程序 */

const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if ((response && status >= 200 && status < 300) || status === 400) {
      return response;
    }
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
// eslint-disable-next-line no-irregular-whitespace
/** 配置request请求时的默认参数 */

const request = extend({
  // eslint-disable-next-line no-irregular-whitespace
  errorHandler, // 默认错误处理
  // eslint-disable-next-line no-irregular-whitespace
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  // 判断是否有token
  console.log('判断是否有token',getAccessToken())
  const token = getAccessToken();
  if (token) {
    const headers = {
      ...options.headers,
      'Sino-Auth': token,
    };
    // 判断是否加时间戳，get请求就加
    const { method } = options;
    // 原地址 有？ 有 =
    if (
      method === 'get' &&
      url.indexOf('?') !== -1 &&
      url.indexOf('=') !== -1 &&
      url !== `/api/sino-auth/enterprise/oauth/token`
    ) {
      return {
        url: `${url}&${Date.now()}`,
        options: { ...options, interceptors: true, headers },
      };
    }
    if (
      method === 'get' &&
      url.indexOf('?') === -1 &&
      url !== `/api/sino-auth/enterprise/oauth/token`
    ) {
      return {
        url: `${url}?${Date.now()}`,
        options: { ...options, interceptors: true, headers },
      };
    }
    if (
      url !== `/api/sino-auth/enterprise/oauth/token` &&
      url !== `/api/sino-resource/sms/endpoint/send-validate` &&
      url !== `/api/sino-system/enterprise-user/checkPhone` &&
      url !== `/api/sino-system/enterprise/certification` &&
      url !== `/api/sino-system/enterprise/withdraw` &&
      url !== `/api/sino-desk/agreement/agreementPaths`
    ) {
      return {
        url,
        options: { ...options, interceptors: true, headers },
      };
    }
  }
});
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if (data.code === 400) {
    return { ...data };
  }
  // 请求未授权
  if (data.code === 401) {
    message.error('请求未授权，请重新登录！');
    removeAll();
    history.push('/user/login');
  }
  return response;
});
export default request;
