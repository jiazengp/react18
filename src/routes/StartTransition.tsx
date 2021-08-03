import React, { startTransition, useEffect, useState } from "react";

/**
 * @description startTransition
 * startTransition 是一个接受回调的函数。我们用它来告诉 React 需要推迟的 state。
 * 允许组件将速度较慢的数据获取更新推迟到随后渲染，以便能够立即渲染更重要的更新。
 */

function getSuggestions(keyword: string): Promise<Array<string>> {
  let items = new Array(10000)
    .fill(0)
    .map((item: number, index: number) => keyword + index);
  return Promise.resolve(items);
}

interface SuggestionProps {
  keyword: string;
}

function Suggestion(props: SuggestionProps) {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  useEffect(() => {
    getSuggestions(props.keyword).then((suggestions) => {
      startTransition(() => {
        setSuggestions(suggestions);
      });
    });
  }, [props.keyword]);

  return (
    <ul>
      {suggestions.map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function () {
  const [keyword, setKeyword] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div>
      <input value={keyword} onChange={handleChange} />
      <Suggestion keyword={keyword} />
    </div>
  );
}
