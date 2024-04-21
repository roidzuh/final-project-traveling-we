import { useRouter } from "next/router";
import MainLayout from "@/layout/MainLayout";
import { fetchBannerById } from "../../utils/api";
import { Container, Row, Col, Card } from "react-bootstrap";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const dataBanner = await fetchBannerById(id);
  const banner = dataBanner.data;
  return { props: { banner } };
}

export default function BannerDetail({ banner }) {
  const router = useRouter();
  const { idBanner } = router.query;

  return (
    <MainLayout>
      <Container className="my-28 mx-auto">
        <Card className="shadow overflow-hidden sm:rounded-lg">
          <Card.Header className="px-4 py-5 sm:px-6 bg-white">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Banner Detail
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detailed information about the banner.
            </p>
          </Card.Header>
          <Card.Body className="border-t border-gray-200">
            <Row className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <Col className="text-sm font-medium text-gray-500">Name</Col>
              <Col className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {banner.name}
              </Col>
            </Row>
            <Row className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <Col className="text-sm font-medium text-gray-500">Image</Col>
              <Col className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="w-80 h-52 object-cover"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </MainLayout>
  );
}
