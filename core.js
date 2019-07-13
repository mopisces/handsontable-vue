/*给指定的钩子添加监听事件*/
@param	key string 				 [钩子名称 (详细名称见 Hooks.js)]
@param	callback function|Array  [方法或者方法组成的数组]
addHook(key, callback);

/*给指定的钩子添加监听事件,触发后自动删除*/
@param	key string 				 [钩子名称 (详细名称见 Hooks.js)]
@param	callback function|Array  [方法或者方法组成的数组]
addHookOnce(key, callback)

