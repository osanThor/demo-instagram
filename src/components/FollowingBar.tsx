"use client";

import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR("/api/me");
  // 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌

  return <div>FollowingBar</div>;
}
