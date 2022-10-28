import {useEffect, useState} from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import {languages as data} from '../../data/languages'
import i18n, {t} from "i18next";
import {useStyles} from './styles';

export function LanguagePicker({style}) {
    const [opened, setOpened] = useState(false);
    const { classes } = useStyles({ opened });
    const [selected, setSelected] = useState(data[0]);
    const items = data.map((item) => (
        <Menu.Item
            icon={<Image src={item.image} width={18} height={18}/>}
            onClick={() => {
                i18n.changeLanguage(item.name);
                setSelected(item)
            }}
            key={item.label}
        >
            {t(item.label)}
        </Menu.Item>
    ));

    useEffect(() => {
        if (i18n.language === 'en')
            setSelected(data[1]);
        else if (i18n.language === 'es')
            setSelected(data[2]);
        else
            setSelected(data[0]);
    }, []);

    return (
        <Menu
            withArrow
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
        >
            <Menu.Target style={style}>
                <UnstyledButton className={classes.control}>
                    <Group spacing="xs">
                        <Image src={selected.image} width={22} height={22} />
                        <span className={classes.label}>{t(selected.label)}</span>
                    </Group>
                    <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    );
}