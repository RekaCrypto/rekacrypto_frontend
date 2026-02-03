"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        id="input-group-url"
        type="search"
        placeholder="Search..."
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </InputGroup>
  );
}
