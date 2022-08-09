// 型のために導入
import { GetStaticProps, NextPage, NextPageContext } from 'next';
// Next.jsの組み込みのコンポーネント
import Head from 'next/head';

// ページコンポーネントのpropsの型定義(ここでは空)
type SSGProps = {
    message: string;
};

// SSG向けのページを実装
// NextPageはNext.jsのPages向けの型
// NextPage<props>でpropsが入るpageであることを明示
const SSG: NextPage<SSGProps> = (props) => {
    const { message } = props;
    return (
        <div>
            {/* Headコンポーネントで包むとその要素は<head>タグに配置される */}
            <Head>
                <title>Static Site Generation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>
                    このページは静的サイト生成によってビルド時に生成されたページです。
                </p>
                <p>{ message }</p>
            </main>
        </div>
    )
}

// getStaticPropsはビルド時に実行される
// GetStaticProps<SSGProps>はSSGPropsを引数にとるgetStaticPropsの型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
    const timestamp = new Date().toLocaleString();
    const message = `${timestamp}にgetStaticPropsが実行されました`;
    console.log(message);
    return {
        // ここで返したpropsを元にページコンポーネントを描画する
        props: {
            message,
        }
    }
}

// ページコンポーネントはexport defaultでエクスポートする
export default SSG;