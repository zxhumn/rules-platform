import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';
let baseApi='apc'

export async function EditRule() {
  return request(baseApi+'/rule/test/ruleSet/ruleSetNewPara/nodes');
}
//规则集列表
export async function RuleSet(params) {
  return request(baseApi+`/rule/ruleSet?${stringify(params)}`);
}
//修改规则集
export async function ruleSetNewPara(category,code) {
  // let url=`/rule/${category}/ruleSet/${code}`
  return request(baseApi+`/rule/${category}/ruleSet/${code}/nodes`);
}

export async function RuleState(category,ruleSetName,ruleName) {
  let url=baseApi+`/rule/${category}/${ruleSetName}/${ruleName}`
  return request(url, {
    method: 'PATCH',
    // body: params,
  });
}
// 删除子规则
export async function RuleDel(category,ruleSetName,ruleName) {
  let url=baseApi+`/rule/${category}/${ruleSetName}/${ruleName}`
  return request(url, {
    method: 'DELETE',
    // body: params,
  });
}
//删除规则集
export async function RuleDelCon(category,ruleName) {
  let url=baseApi+`/rule/${category}/${ruleName}/ruleSet`
  return request(url, {
    method: 'DELETE',
    // body: params,
  });
}
// 新增规则集
export async function AddRuleCon(category,ruleSetName,params) {
  let url=baseApi+`/rule/${category}/ruleSet/node/${ruleSetName}`
  return request(url, {
    method: 'POST',
    body: params,
  });
}
//获取属性
export async function RuleAttrs() {
  return request(baseApi+'/ruleOp/attrs');
}
//获取内置函数---方法
export async function RuleMothods() {
  return request(baseApi+"/ruleOp/methods");
}
//比较符
export async function Rulecompare() {
  return request(baseApi+'/ruleOp/ops');
}
//获取所有常量
export async function Constants() {
  return request(baseApi+'/model/allConstants');
}
//获取所有变量
export async function Parameters() {
  return request(baseApi+'/model/parameters/all');
}

//新增子规则

export async function addOneRule(category,ruleSetNo,params) {
  let url=baseApi+`/rule/${category}/${ruleSetNo}`
  return request(url, {   
    method: 'POST',
    body:params
  });
}

//修改规则集保存

export async function RuleEditSave(category,ruleSetNo,params) {
  let url=baseApi+`/rule/ruleSet/${category}/${ruleSetNo}/node/`
  return request(url, {
   
    method: 'PATCH',
    body:params
  });
}
//操作记录列表
export async function opTionCon(params) {
  return request(baseApi+`/history?${stringify(params)}`);
}
//操作类型列表
export async function historyOps(params) {
  return request(baseApi+`/history/ops?${stringify(params)}`);
}
//修改子规则保存
export async function RuleEditSonSave(category,ruleSetName,ruleName,params) {
  let url=baseApi+`/rule/${category}/${ruleSetName}/${ruleName}`
  return request(url, {
    method: 'PUT',
    body: params,
  });
}
//获取规则
export async function RuleItem(params) {
  return request(baseApi+`/rule/rule?${stringify(params)}`);
}

//获取规则模板
export async function ruleTemplate() {
  return request(baseApi+'/ruleOp/ruleTemplate');
}


//获取规则集模板
export async function ruleSetTemplate() {
  return request(baseApi+'/ruleOp/ruleSetTemplate');
}

//测试规则集
export async function testRule(category,ruleName,params) {
  let url=baseApi+`/rule/${category}/ruleSet/${ruleName}/test`
  return request(url, {
    method: 'POST',
    body: params,
  });
}
//获取规则集下所有变量
export async function testRuleParame(cate,no) {
  let url=baseApi+`/rule/parameters/${cate}/${no}`
  return request(url, {
    method: 'GET'
  });
}
// 新增规则集-json节点格式
export async function addRuleNode(params) {
  let url=baseApi+'/rule/ruleSet/node/'
  return request(url, {
    method: 'POST',
    body: params,
  });
}

/**
 * 规则分组
 */

// 规则集目录
export async function Category() {
  return request(baseApi+'/rule/category');
}
// 新增分类下拉的选项
export async function addCategory(categoryName) {
  return request(baseApi+`/rule/category?categoryName=${categoryName}`, {
    method: 'POST',
  });
}
// 删除分类下拉的选项
export async function deleteCategory(categoryName) {
  return request(baseApi+`/rule/category/${categoryName}`, {
    method: 'DELETE',
  });
}
//测试规则集
export async function editCategory(oldP,newP) {
  let url=baseApi+`/rule/category/${oldP}/${newP}`
  return request(url, {
    method: 'PATCH'
  })
};