import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';
let baseApi='/apc'
// 查询所有常量
export async function getConstants(param) {
  return request(baseApi+`/model/constants?${stringify(param)}`);
}
// 新增常量
export async function newConstants(params) {
  return request(baseApi+`/model/constants`, {
    method: 'POST',
    body: params,
  });
}

// 修改常量
export async function getEditConstants(param) {
  return request(baseApi+`/model/constants/modify/${param}`);
}
// 确定修改常量
export async function suerEditConstants(oldCategory, params) {
  return request(baseApi+`/model/constants/${oldCategory}`, {
    method: 'PUT',
    body: params,
  });
}
// 删除常量某一列实际值/显示值
export async function deleteConstantsFactAndShow(category, name) {
  return request(baseApi+`/model/constants/${category}/${name}`, {
    method: 'DELETE',
  });
}
// 删除常量
export async function deleteConstants(category) {
  return request(baseApi+`/model/constants/${category}`, {
    method: 'DELETE',
  });
}
// 修改
export async function editConstants(params) {
  return request(baseApi+`/model/constants`, {
    method: 'PATCH',
    body: params,
  });
}
// 查询所有变量
export async function parametersGet(param) {
  return request(baseApi+`/model/parameters?${stringify(param)}`);
}
// 查询分类下拉
export async function parameterSet(param) {
  return request(baseApi+`/model/parameterSet?${stringify(param)}`);
}
// 修改分类下拉的选项
export async function editSelectType(oldCategory, newCategory) {
  return request(baseApi+`/model/modifyCategory/${oldCategory}/${newCategory}`, {
    method: 'PATCH',
  });
}
// 新增分类下拉的选项
export async function newSelectType(newParameterSet) {
  return request(baseApi+`/model/${newParameterSet}`, {
    method: 'POST',
    // body: params,
  });
}
// 删除分类下拉
export async function deleteSelectType(deleteParameterSet) {
  return request(baseApi+`/model/${deleteParameterSet}`, {
    method: 'DELETE',
  });
}
// 查询变量/常量类型下拉
export async function datatypeGet() {
  return request(baseApi+`/model/datatype`);
}
// 新增某一个变量
export async function parametersNew(params) {
  return request(baseApi+`/model/parameterSet/parameter`, {
    method: 'POST',
    body: params,
  });
}
// 修改变量
export async function parametersEdit(category, name, params) {
  return request(baseApi+`/model/${category}/${name}/parameter/`, {
    method: 'PATCH',
    body: params,
  });
}
// 删除某个变量
export async function parametersDelete(param) {
  return request(baseApi+`/model/${param.parameterSet}/${param.name}`, {
    method: 'DELETE',
  });
}
// 新建变量
export async function parametersGreate(params) {
  return request(baseApi+`/model/{parameterSet}/parameters`, {
    method: 'POST',
    body: params,
  });
}
// 变量文件引用
export async function whouseme(params) {
  return request(baseApi+`/model/whouseme?${stringify(params)}`);
}
// 常量文件引用
export async function constantsWhouseme(params) {
  return request(`/apc/model/constants/whousedme?${stringify(params)}`);
}
/** *
 * 知识包管理
 */
// 查询知识包
export async function knowledgePackage(params) {
  return request(baseApi+`/knowledgePackage?${stringify(params)}`);
}

// 新增
export async function addKnowledgePackage(params) {
  return request(baseApi+`/knowledgePackage`, {
    method: 'POST',
    body: params,
  });
}

// 修改
export async function putKnowledgePackage(id, params) {
  return request(baseApi+`/knowledgePackage/${id}`, {
    method: 'PUT',
    body: params,
  });
}
// 删除
export async function deleteKnowledgePackage(params) {
  return request(baseApi+`/knowledgePackage/${params}`, {
    method: 'DELETE',
  });
}
// 更新
export async function updateKnowledgePackage(params) {
  return request(baseApi+`/knowledgePackage/${params}/pattern`, {
    method: 'POST',
  });
}
// export async function updateKnowledgePackage(params) {
//   return request(baseApi+`/knowledgePackage/${params}/pattern`, {
//     method: 'POST'
//   });
// }
// 测试
export async function testKnowledgePackage(params) {
  return request(baseApi+`/knowledgePackage/${params}/test`, {
    method: 'POST',
  });
}
// 获取某个知识包下的所有变量
export async function packsRest(params) {
  return request(baseApi+`/rest/${params}`);
}
// 调用知识包格式--测试
export async function packsTest(id, params) {
  return request(baseApi+`/rest/${id}`, {
    method: 'POST',
    body: params,
  });
}
// 查询历史记录
export async function history(param) {
  return request(baseApi+`/history?${stringify(param)}`);
}
// 查询操作类型列表
export async function ops(param) {
  return request(baseApi+`/history/ops?${stringify(param)}`);
}

/**
 * 规则集
 */
// 获取获取所有规则集
export async function getAllRule(params) {
  return request(baseApi+`/rule/ruleSet?${stringify(params)}`);
}
