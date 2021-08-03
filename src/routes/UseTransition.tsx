import React, { Component, Suspense, useTransition, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

/**
 * @description useTransition
 * 允许组件在切换到下一个界面之前等待内容加载，从而避免不必要的加载状态同时它还允许组件将速度较慢的数据获取更新推迟到随后渲染，以便能够立即渲染更重要的更新。
 * useTransition hook 返回两个值的数组
 *    startTransition 是一个接受回调的函数。我们用它来告诉 React 需要推迟的 state
 *    isPending 是一个布尔值。这是 React 通知我们是否正在等待过渡的完成的方式
 * 如果某个 state 更新导致组件挂起，则该 state 更新应包装在 transition 中。
 */

function fetchData(id: number):Promise<data> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { id, name: "张三" + id } });
      //reject({success:false,message:'获取数据发生了错误'});
    }, 3000);
  });
}

interface data {
  success: boolean;
  data?: {
    id: number;
    name: string;
  };
  message?: string;
}

interface UserProps {
  resource: any;
}

function User(props: UserProps) {
  const result = props.resource.read();
  if (result.success) {
    let user = result.data;
    return (
      <p>
        {user.id}:{user.name}
      </p>
    );
  } else {
    return <p>{result.message}</p>;
  }
}

function createResource(promise: Promise<data>) {
  let status = "pending";
  let result: any;
  return {
    read() {
      if (status === "success" || status === "error") {
        return result;
      } else {
        throw promise.then(
          (data: any) => {
            status = "success";
            result = data;
          },
          (error: any) => {
            status = "error";
            result = error;
          }
        );
      }
    },
  };
}

const initialResource = createResource(fetchData(1));

export default function () {
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <ErrorBoundary fallback={<h1>出错了</h1>}>
        <Suspense fallback={<h1>加载中...</h1>}>
          <User resource={resource} />
        </Suspense>
      </ErrorBoundary>
      {isPending ? " 加载中..." : null}
      <button
        disabled={isPending}
        onClick={() => {
          //startTransition(() => {
          setResource(createResource(fetchData(2)));
          //});
        }}
      >
        下一个用户
      </button>
    </>
  );
}
