import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import PageHeader from '@common/components/lib/partials/PageHeader';
import Labels from '@common/defs/labels';
import Namespaces from '@common/defs/namespaces';
import Routes from '@common/defs/routes';
import { CRUD_ACTION, Id } from '@common/defs/types';
import useProgressBar from '@common/hooks/useProgressBar';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import EventDetails from '@modules/events/components/partials/EventDetails';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne } = useEvents();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState<null | Event>(null);
  const id: Id = Number(router.query.id);
  const { t } = useTranslation(['event', 'common']);

  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    if (id) {
      const { data } = await readOne(id);
      if (data) {
        if (data.item) {
          setItem(data.item);
        }
      }
      setLoaded(true);
    }
  };

  return (
    <>
      <PageHeader title={t(`event:${Labels.Events.ReadOne}`)} />
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`event:${Labels.Events.Items}`), href: Routes.Events.ReadAll },
          { name: item ? item.title : t(`event:${Labels.Events.ReadOne}`) },
        ]}
      />

      {item && <EventDetails item={item} fetchEvent={fetchEvent} />}
    </>
  );
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

export default withAuth(
  withPermissions(EventPage, {
    requiredPermissions: {
      entity: Namespaces.Events,
      action: CRUD_ACTION.READ,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
