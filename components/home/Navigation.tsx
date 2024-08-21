"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React, { useEffect, useState } from "react";
import { GithubIcon } from "../icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const DropDown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent text-3xl">
          <GithubIcon size={40} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem href="https://github.com/shorya-1012" as={Link} key="new">
          {"Shorya's"}
        </DropdownItem>
        <DropdownItem
          href="https://github.com/SurajKharkwal"
          as={Link}
          key="copy"
        >
          {"Suraj's"}
        </DropdownItem>
        <DropdownItem
          href="https://github.com/SurajKharkwal/juit-time-table"
          as={Link}
          key="delete"
          className="text-primary"
          color="primary"
        >
          Repository
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Navigation = () => {
  return (
    <nav className="w-full fixed top-0 left-0 flex items-center justify-center  h-[10vh]">
      <div className="max-w-[100vw] md:max-w-[90vw] flex items-center justify-end pl-4 pr-4 w-full h-full ">
        {/* <p className='max-md:hidden text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold"'>
          Check out our
        </p> */}

        <DropDown />
      </div>
    </nav>
  );
};

export default Navigation;
