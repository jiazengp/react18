import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import BatchState from "./routes/BatchState";
import Suspense from "./routes/Suspense";
import SuspenseList from "./routes/SuspenseList";
import StartTransition from "./routes/StartTransition";
import UseDeferredValue from "./routes/UseDeferredValue";
import UseTransition from "./routes/UseTransition";

import "./index.sass"

/**
 * LegacyMode
 * ReactDOM.render(<App />, rootNode) 当前 React 使用的模式，不支持部分新特性。会使用同步渲染。
 *
 * BlockingMode
 * ReactDOM.createBlockingRoot(rootNode).render(<App />) 过渡模式，将作为迁移到 ConcurrentMode 的第一个步骤。
 *
 * ConcurrentMode
 * ReactDOM.createRoot(rootNode).render(<App />) 未来稳定后的默认开发模式，开启了所有的新功能包括启用并发渲染。
 */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <ul className="list">
      <li>
        <Link to="/BatchState">BatchState</Link>
      </li>
      <li>
        <Link to="/Suspense">Suspense</Link>
      </li>
      <li>
        <Link to="/SuspenseList">SuspenseList</Link>
      </li>
      <li>
        <Link to="/StartTransition">StartTransition</Link>
      </li>
      <li>
        <Link to="/UseDeferredValue">UseDeferredValue</Link>
      </li>
    </ul>
    <Route path="/BatchState" component={BatchState} />
    <Route path="/Suspense" component={Suspense} />
    <Route path="/SuspenseList" component={SuspenseList} />
    <Route path="/StartTransition" component={StartTransition} />
    <Route path="/UseDeferredValue" component={UseDeferredValue} />
    <Route path="/UseTransition" component={UseTransition} />
  </Router>
);

/**
 * @description ConcurrentMode
 * @link https://reactjs.org/docs/concurrent-mode-intro.html
 * 在 React 18 中新加入的可选的并发渲染（ConcurrentRendering）机制。
 * ConcurrentMode 是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。
 * 在 ConcurrentMode 中，渲染不是阻塞的。它是可中断的。
 *
 * 更新优先级
 *    在之前更新没有优先级的概念，优先级高的更新并不能打断之前的更新，需要等前面的更新完成后才能进行。
 *    但是通常用户对不同的操作对交互的执行速度有不同的预期，所以我们可以根据用户的预期赋予更新不同的优先级
 *      - 高优先级 用户输入、窗口缩放和拖拽事件等
 *      - 低优先级 数据请求和下载文件等
 *    高优先级的更新会中断正在进行的低优先级的更新。
 *    等高优先级更新完成后，低优先级基于高优先级更新的结果重新更新。
 *    对于 CPU-bound 的更新（例如创建新的 DOM 节点和运行组件中的代码），并发意味着一个更急迫的更新可以“中断”已经开始的渲染。
 *
 * Double Buffering（https://wiki.osdev.org/Double_Buffering）
 *    当数据量很大时，绘图可能需要几秒钟甚至更长的时间，而且有时还会出现闪烁现象，为了解决这些问题，可采用双缓冲技术进行绘图。
 *    双缓冲即在内存中创建一个与屏幕绘图区域一致的对象，先将图形绘制到内存中的这个对象上，再一次性将这个对象上的图形拷贝到屏幕上，这样能大大加快绘图的速度。
 *    对于 IO-bound 的更新（例如从网络加载代码或数据），并发意味着 React 甚至可以在全部数据到达之前就在内存中开始渲染，然后跳过令人不愉快的空白加载状态。
 *
 * Automatic batching（https://github.com/reactwg/react-18/discussions/21）
 * 在 ConcurrentMode 中更新是以优先级为依据进行合并的
 */
