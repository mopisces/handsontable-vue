/**
 * [handsontable初始化时为指定的钩子添加方法]
 * @param  {[string]}         key       [钩子名称(详细名称见example.vue)]
 * @param  {[function|array]} callback  [回调方法或回调方法组成的数组]
 */
addHook(key, callback);
/**
 * [handsontable初始化时为指定的钩子添加方法,钩子触发一次后自动失效]
 * @param  {[string]}         key       [钩子名称(详细名称见example.vue)]
 * @param  {[function|array]} callback  [回调方法或回调方法组成的数组]
 */
addHookOnce(key, callback);
/**
 * [插入或者移除列(行)]
 * @param  {[string]}  action [可能的操作:'insert_row','insert_col','remove_row','remove_col']
 * @param  {[string]}  index  []
 * @param  {[string]}  amount []
 * @param  {[string]}  source []
 * @param  {[string]}  keepEmptyRows []
 */
alter(action, index, amount, source, keepEmptyRows);
/**
 * [从表中清除数据时触发(表的配置不变)]
 */
clear();
/**
 * [返回被渲染的列的索引]
 * @return {[number]} [被渲染的列的索引]
 */
colOffset();
/**
 * [返回给定列坐标的property名称,如果data是数组格式,然后列的真实索引]
 * @param  {[number]} [column] [列的可视索引]
 * @return {[string|number]}   [列的property或者列的真实索引]
 */
colToProp(column);
/**
 * [返回表中所有的可见列的总数]
 * @return {[number]} [表中所有的可见列的总数]
 */
countCols();
/**
 * [返回空列的数量]
 * @param {[boolean]} [ending](default false) [true只在data最后统计空列数量]
 * @return {[number]} [空列的数量]
 */
countEmptyCols(ending);
/**
 * [返回空行的数量]
 * @param  {[boolean]} [ending](default false) [true只在data最后统计空行数量]
 * @return {[number]}  [空行的数量]
 */
countEmptyRows(ending);
/**
 * [返回被渲染的列数量]
 * @return {[number]} [被渲染的列数量|表不可见返回-1]
 */
countRenderedCols();
/**
 * [返回被渲染的行数量]
 * @return {[number]} [被渲染的行数量|表不可见返回-1]
 */
countRenderedRows();
/**
 * [返回表中可见行的数量]
 * @return {[number]} [表中可见行的数量]
 */
countRows();
/**
 * [返回data中列的数量]
 * @return {[number]} [data中列的数量]
 */
countSourceCols();
/**
 * [返回data中行的数量]
 * @return {[number]} [data中行的数量]
 */
countSourceRows();
/**
 * [返回可见列的数量]
 * @return {[number]} [可见列的数量]
 */
countVisibleCols();
/**
 * [返回可见行的数量]
 * @return {[number]} [可见行的数量]
 */
countVisibleRows();
/**
 * [取消选定当前选中的cell]
 */
deselectCell();
/**
 * [把table从DOM中移除并摧毁Handsontale的实例]
 */
destroy();
/**
 * [销毁当前编辑器,渲染表格,准备编辑新的选择cell]
 * @param {[boolean]} [revertOriginal](default false)        [true修改之前的值被重新存储,false相反]
 * @param {[boolean]} [prepareEditorIfNeeded](default true)  [true选择cell的编辑器被开启]
 */
destroyEditor(revertOriginal,prepareEditorIfNeeded);
/**
 * [清除被选中cell的值]
 */
emptySelectedCells();
/**
 * [返回活跃的编辑器实例]
 * @return {[instance]} [活跃的编辑器实例]
 */
getActiveEditor();
/**
 * [返回被指定的cell的HTMLTableCellElement]
 * @param {[number]} [row]               [行索引]
 * @param {[number]} [column]            [列索引]
 * @param {[boolean]} [topmost]          [是否返回最顶层覆盖的 TD element]
 * @return {[HTMLTableCellElement|null]} [被指定的cell的HTMLTableCellElement]
 */
getCell(row, column, topmost);
/**
 * [返回指定cell的编辑类]
 * @param {[number]} [row] 	  [行索引]
 * @param {[number]} [column] [列索引]
 * @return {[function]} [编辑类]
 */
getCellEditor(row,column);
/**
 * [返回指定cell的properties对象]
 * @param {[number]} [row]    [行索引]
 * @param {[number]} [column] [列索引]
 * @return {[object]}         [指定cell的properties对象]
 */
getCellMeta(row, column);
/**
 * [返回给定行的cell对象组成的数组]
 * @param {[number]} [row] [行索引]
 * @return {[array]} [给定行的cell对象组成的数组]
 */
getCellMetaAtRow(row);
/**
 * [返回指定cell的渲染方法]
 * @param {[number|object]} [row] [行索引|cell对象]
 * @param {[number]} [column]     [列索引]
 * @return {[function]}           [指定cell的渲染方法]
 */
getCellRenderer(row, column);
/**
 * [返回所有cell的最新配置]
 * @return {[array]} [返回一个包含列配置对象实例的数组]
 */
getCellsMeta();
/**
 * [返回指定cell的验证方法]
 * @param {[number|object]} [row]        [行索引|cell对象]
 * @param {[number]}        [column]     [列索引]
 * @return {[function|RegExp|undefined]} [指定cell的验证方法]
 */
getCellValidator(row, column);
/**
 * [返回所有或者指定列的头部]
 * @param {[number]} [column]    [指定列的索引]
 * @return {array|string|number} [所有或者指定列的头部]
 */
getColHeader(column);
/**
 * [返回指定列的宽度]
 * @param {[number]} [column] [指定列的索引]
 * @return {[number]}           [指定列的宽度]
 */
getColWidth(column);
/**
 * [返回给定HTMLTableCellElement cell的坐标]
 * @param {[HTMLTableCellElement]} [element] [cell的HTMLTableCellElement]
 * @return {[CellCoords]}                    [cell的坐标]
 */
getCoords(element);
/**
 * [返回指定cell的可复制的值]
 * @param {[number]} [row]    [行索引]
 * @param {[number]} [column] [列索引]
 * @return {[string]}         [指定cell的可复制的值]
 */
getCopyableData(row, column);
/**
 * [返回选中区域的值(每个列用TAB分割,每个行用新行的标识分开)]
 * @param {[number]} [startRow] [开始cell的行索引]
 * @param {[number]} [startCol] [开始cell的列索引]
 * @param {[number]} [endRow]   [结束cell的行索引]
 * @param {[number]} [endCol]   [结束cell的列索引]
 * @return {[string]} [选中区域的值]
 */
getCopyableText(startRow, startCol, endRow, endCol);
/**
 * [返回指定区域的值]
 * @param {[number]} [row]     [开始的行索引]
 * @param {[number]} [column]  [开始的列索引]
 * @param {[number]} [row2]    [结束的行索引]
 * @param {[number]} [column2] [结束的行索引]
 * @return {[array]} [指定区域的值]
 */
getData(row, column, row2, column2);
/**
 * [返回指定cell的值]
 * @param {[number]} [row] [行索引]
 * @param {[number]} [column] [列索引]
 * @return {[*]}               [选中cell的值]
 */
getDataAtCell(row, column);
/**
 * [从原始数据中返回指定列的cell的值]
 * @param {[number]} [column] [可见列的索引]
 * @return {array}            [cell值组成的数组]
 */
getDataAtCol(column);
/**
 * [返回指定列prop的cell值]
 * @param {string|number} [prop] [列名称或者列索引]
 * @return {array}               [cell值组成的数组]
 */
getDataAtProp(prop);
/**
 * [返回指定行的数据]
 * @param {number} [row] [指定的行索引]
 * @return {array}       [指定行数据数组]
 */
getDataAtRow(row);
/**
 * [返回指定行的指定列prop的值]
 * @param {number} [row] [行索引]
 * @param {string} [prop] [列prop值]
 * @return {*} [cell的值]
 */
getDataAtRowProp(row, prop);
/**
 * [获取指定区域的数据类型(type对应的值)]
 * @param {number} [rowFrom] [开始的行索引]
 * @param {number} [columnFrom] [开始的列索引]
 * @param {number} [rowTo] [结束的行索引]
 * @param {number} [columnTo] [结束的列索引]
 * @return {string} [数据类型]
 */
getDataType(rowFrom, columnFrom, rowTo, columnTo);
/**
 * [返回HandsonTable的实例]
 * @return {instance} [HandsonTable的实例]
 */
getInstance();
/**
 * [返回指定插件名的实例]
 * @param {string} [pluginName] [插件名称]
 * @return {instance}           [插件实例]
 */
getPlugin(pluginName);
/**
 * [返回指定行的行头或者全部行头组成的数组]
 * @param {number} [row](可选) [行索引]
 * @return {} [指定行的行头或者全部行头组成的数组]
 */
getRowHeader(row);
/**
 * [返回指定行的行高]
 * @param {number} [row] [行的索引]
 * @return {number}      [指定行的行高]
 */
getRowHeight(row);
/**
 * []
 * @return {object} [description]
 */
getSchema();
getSelected();