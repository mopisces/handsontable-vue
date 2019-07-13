/*给指定的钩子添加监听事件*/
@param	key string 				 [钩子名称 (详细名称见 Hooks.js)]
@param	callback 	function|Array  [方法或者方法组成的数组]
addHook(key, callback);

/*给指定的钩子添加监听事件,触发后自动删除*/
@param	key string 				 [钩子名称 (详细名称见 Hooks.js)]
@param	callback 	function|Array  [方法或者方法组成的数组]
addHookOnce(key, callback)

/*允许插入行或列来改变表的结果*/
@param	action 			string				[可能的值:'insert_row'/'insert_col'/'remove_row'/'remove_col']
@param	index 			number|array(number)[指定可见的行或者列的删除或插入行或列 [[index, amount],...]. ]
@param	amount			number(default 1)	[指定插入或删除的数量] 
@param	source			string				[源的标记]
@param	keepEmptyRows	boolean				[防止空行被删除]
alter(action, index, amount, source, keepEmptyRows)

/*删除表中的data,表的配置不变*/
clear()

/*返回可视的被渲染第一列的索引*/
@return		number		[可视的被渲染第一列的索引]
colOffset()


colToProp(column)


/*返回表格中可见列的数量*/
@return		number		[可见列的数量]
countCols()

/*返回空列的数量*/
@param	ending			boolean(default false) []
countEmptyCols(ending)