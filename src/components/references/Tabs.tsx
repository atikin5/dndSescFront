import React, {ReactElement, ReactNode} from "react";
import {Box, Tab, Tabs} from "@mui/material";

interface TabPanelProps {
    children?: ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>)
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface BasicTabsProps {
    name: string
    tabsBody: ReactElement<any, any>[]
    tabsHead: any[]
}

export function BasicTabs({tabsBody, tabsHead, name}: BasicTabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function ConstructTabsHeader() {
        let tabsHeads: ReactElement[] = [];
        for (let i = 0; i < tabsHead.length; i++) {
            tabsHeads.push(
                <Tab label={tabsHead[i]} {...a11yProps(i)} key={i}/>
            )
        }
        return (tabsHeads)
    }

    function ConstructTabsContent() {
        let tabsContent: ReactNode[] = []
        for (let i = 0; i < tabsBody.length; i++) {
            tabsContent.push(
                <CustomTabPanel value={value} index={i} key={i}>
                    {tabsBody[i]}
                </CustomTabPanel>)
        }
        return tabsContent;
    }

    return (
        <div className="z-0 absolute">
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label={name}>
                        {ConstructTabsHeader()}
                    </Tabs>
                </Box>
                {ConstructTabsContent()}
            </Box>
        </div>
    )
}
